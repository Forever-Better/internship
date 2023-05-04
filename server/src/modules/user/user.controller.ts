import { Controller, Get, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

  @Get(':id/:posts')
  findOneWithposts(@Param('id') id: string, @Param('posts') posts: string) {
    return this.userService.findOneWithPosts(+id, posts);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/followers')
  follow(@Request() req, @Param() id: number) {
    return this.userService.follow(id, req.user.id);
  }
}
