import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  image: string | null;
  status: string | null;
  university: string | null;
  age: number | null;
  city: string | null;
}
