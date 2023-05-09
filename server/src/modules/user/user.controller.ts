import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { Post } from '../post/entities/post.entity';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('friends/posts')
  async findFriendsPostList(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<Post>> {
    return infinityPagination(await this.userService.findFriendsPostList(req.user.id, { page, limit }), {
      page,
      limit,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('friends')
  async findFriends(@Request() req): Promise<User[]> {
    return this.userService.findFriends(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('friends/possible')
  findPossibleFriends(@Request() req): Promise<User[]> {
    return this.userService.findPossibleFriends(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Request() req,
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    const { viewer, ...otherData } = await this.userService.findOneById(+id, req.user.id, {
      page,
      limit,
    });

    const posts = infinityPagination(otherData.posts, { page, limit });

    return { user: otherData, posts, viewer };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }
}
