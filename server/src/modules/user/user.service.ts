import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }

  async findOne(fields: EntityCondition<User>) {
    return this.repository.findOne({ where: fields });
  }

  async findOneById(id: number) {
    const user = await this.repository
      .createQueryBuilder('users')
      .where({ id })
      .leftJoinAndSelect('users.following', 'following')
      .leftJoinAndSelect('users.followers', 'followers')
      .leftJoinAndSelect('users.articles', 'articles')
      .leftJoinAndSelect('users.bookmarks', 'bookmarks')
      .leftJoinAndSelect('users.likes', 'likes')
      .leftJoinAndSelect('users.drafts', 'drafts')
      .getOne()
      .then((a) => ({ ...a, followersCount: a.followers.length }));

    if (!user) throw new NotFoundException('Пользователь не найден');

    return user;
  }

  async findOneWithPosts(id: number, posts: string) {
    const user = await this.repository
      .createQueryBuilder('users')
      .where({ id })
      .leftJoinAndSelect('users.following', 'following')
      .leftJoinAndSelect('users.followers', 'followers')
      .leftJoinAndSelect(`users.${posts}`, `${posts}`)
      .leftJoinAndSelect(`${posts}.user`, 'user')
      .getOne()
      .then((a) => ({ ...a, followersCount: a.followers.length }));

    if (!user) throw new NotFoundException('Пользователь не найден');

    return { ...user, content: user[posts] };
  }

  findOneForAuth(email: string) {
    return this.repository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  updateProfile(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.save({ id, ...updateUserDto });
  }

  softDelete(id: number) {
    return this.repository.softDelete(id);
  }

  follow(userId: number, followerId: number) {
    // return this.repository.update(userId, followerId);
  }
}
