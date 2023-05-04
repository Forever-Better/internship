import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostService } from 'src/modules/post/post.service';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private repository: Repository<Like>,
    private readonly postService: PostService,
  ) {}

  async create(postId: number, userId: number) {
    const findLike = await this.repository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });
    if (findLike) throw new NotAcceptableException('Уже есть оценка.');

    const find = await this.postService.findOne(postId);
    if (!find) throw new NotFoundException('Пост не найден');

    return this.repository.save({ post: { id: postId }, user: { id: userId } });
  }

  async remove(postId: number, userId: number) {
    const findLike = await this.repository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });
    if (!findLike) throw new NotAcceptableException('Оценки нет.');

    const find = await this.postService.findOne(postId);
    if (!find) throw new NotFoundException('Пост не найден');

    return this.repository.delete({ post: { id: postId }, user: { id: userId } });
  }
}
