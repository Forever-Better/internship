import { IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  image?: string;

  @IsOptional()
  body?: string;
}
