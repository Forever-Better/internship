import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from 'argon2';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/entities/user.entity';
import { GenerateJwtTokenDto } from './dto/generate-jwt-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneForAuth(email);
    if (!user) throw new NotFoundException('Пользователь не найден.');
    if (!user.password) throw new NotFoundException('Зарегистрирован через социальную сеть или пароль не найден.');

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) throw new UnauthorizedException('Неверный почтовый адрес или пароль.');

    if (user && isValidPassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  generateJwtTokens(dto: GenerateJwtTokenDto) {
    const payload = { email: dto.email, sub: dto.sub };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('auth.refreshSecret'),
      expiresIn: this.configService.get('auth.refreshExpires'),
    });

    return { accessToken, refreshToken };
  }

  async login(user: User) {
    const { password, ...userData } = user;

    return {
      user: userData,
      accessToken: this.generateJwtTokens({ ...user, sub: user.id }).accessToken,
      refreshToken: this.generateJwtTokens({ ...user, sub: user.id }).refreshToken,
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const findByEmail = await this.userService.findOneForAuth(signUpDto.email);
    if (findByEmail) throw new BadRequestException('Данный почтовый адрес уже занят.');

    const { password, ...user } = await this.userService.create({
      email: signUpDto.email,
      password: await hash(signUpDto.password),
      firstName: signUpDto.firstName,
      lastName: signUpDto.lastName,
    });

    return {
      user,
      accessToken: this.generateJwtTokens({ ...user, sub: user.id }).accessToken,
      refreshToken: this.generateJwtTokens({ ...user, sub: user.id }).refreshToken,
    };
  }

  async refresh(id: number) {
    const user = await this.userService.findOne({ id });

    if (!user) throw new UnauthorizedException('Пользователь не найден');

    return {
      user,
      accessToken: this.generateJwtTokens({ ...user, sub: user.id }).accessToken,
      refreshToken: this.generateJwtTokens({ ...user, sub: user.id }).refreshToken,
    };
  }

  async getProfile(user: User) {
    return this.userService.findOne({ id: user.id });
  }
}
