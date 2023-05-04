import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { PostModule } from 'src/modules/post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), PostModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
