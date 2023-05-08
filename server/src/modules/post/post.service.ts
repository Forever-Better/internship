import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from '../user/user.service';
import { PaginationOptions } from 'src/utils/types/pagination-options';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    @Inject(forwardRef(() => UserService))
    private repository: Repository<Post>,
  ) {}

  create(userId: number, createPostDto: CreatePostDto) {
    return this.repository.save({
      user: { id: userId },
      image: createPostDto.image,
      body: createPostDto.body,
    });
  }

  async findManyWithPagination(userId: number, paginationOptions: PaginationOptions): Promise<Post[]> {
    return await this.repository.find({
      where: { user: { id: userId } },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const find = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!find) throw new NotFoundException('Пост не найден');

    return find;
  }

  async update(postId: number, userId: number, updatePostDto: UpdatePostDto) {
    const find = await this.repository.findOne({
      where: { id: postId },
      relations: ['user'],
    });

    if (!find) throw new NotFoundException('Пост не найден');

    if (userId !== find.user.id) throw new ForbiddenException('Пост принадлежит другому пользователю.');

    this.repository.update(postId, {
      image: updatePostDto.image,
      body: updatePostDto.body,
    });

    return this.repository.findOne({ where: { id: postId } });
  }

  async remove(id: number, userId: number) {
    const find = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!find) throw new NotFoundException('Пост не найден');

    if (userId !== find.user.id) throw new ForbiddenException('Пост принадлежит другому пользователю.');

    this.repository.softDelete(id);

    return find;
  }
}
