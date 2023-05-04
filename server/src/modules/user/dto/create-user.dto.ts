import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Почтовый адрес обязательное поле.' })
  @IsEmail(undefined, { message: 'Не является почтовым адресом.' })
  @Length(5, 32, { message: 'Длина почтового адреса от 5 до 32 символов.' })
  email: string;

  @IsNotEmpty({ message: 'Пароль обязательное поле.' })
  @Length(8, 32, { message: 'Длина пароля от 8 до 32 символов.' })
  password?: string;

  @Length(3, 16, { message: 'Длина имени от 3 до 16 символов.' })
  firstName?: string;

  @Length(3, 22, { message: 'Длина фамилии от 3 до 22 символов.' })
  lastName?: string;

  @IsOptional()
  @IsNotEmpty()
  image?: string;
}
