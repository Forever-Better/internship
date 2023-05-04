import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private repository: Repository<Post>,
  ) {}

  create(userId: number, createPostDto: CreatePostDto) {
    return this.repository.save({
      user: { id: userId },
      title: createPostDto.title,
      cover: createPostDto.cover,
      body: createPostDto.body,
    });
  }

  findAll() {
    return this.repository.find({ order: { createdAt: 'DESC' } });
  }

  findUserPosts(userId: number) {
    return this.repository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
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
      title: updatePostDto.title,
      cover: updatePostDto.cover,
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

  async findNext(id: number) {
    return await this.repository.find({ where: { id: Not(id) }, take: 3 });
  }
}
