import { Controller, Post, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('posts/:id/likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Param('id') postId: string) {
    return this.likeService.create(+postId, +req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Request() req, @Param('id') postId: string) {
    return this.likeService.remove(+postId, +req.user.id);
  }
}
