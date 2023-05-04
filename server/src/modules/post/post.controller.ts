import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('Post')
export class PostController {
  constructor(private readonly PostService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createPostDto: CreatePostDto) {
    // return this.PostService.create(req.user, createPostDto);
  }

  @Get()
  findAll() {
    return this.PostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.PostService.findOne(+id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':id')
  // update(@Request() req, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.PostService.update(+id, req.user.id, updatePostDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.PostService.remove(+id, req.user.id);
  }
}
