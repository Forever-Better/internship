import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  image: string;
  status: string;
  university: string;
  age: number;
  city: string;
}
