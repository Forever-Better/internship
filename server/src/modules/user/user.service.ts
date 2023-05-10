import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Not, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { PostService } from '../post/post.service';
import { PaginationOptions } from 'src/utils/types/pagination-options';
import { Post } from '../post/entities/post.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private postService: PostService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }

  async findOne(fields: EntityCondition<User>, relations?) {
    return this.repository.findOne({ where: fields, relations: relations });
  }

  async findOneById(id: number, viewerId: number, options: PaginationOptions) {
    const user = await this.repository.findOne({
      relations: ['posts.user', 'following.followingTo', 'followers.user', 'likes.post'],
      where: { id },
      order: { posts: { createdAt: 'DESC' } },
    });
    if (!user) throw new NotFoundException('Пользователь не найден');

    // формируем список друзей т.к. имеем косяк (нужно изменить систему друзей)
    const friends = [...user.following.map((item) => item.followingTo)];
    const followers = [...user.followers.map((item) => item.user)];

    // посты пользователя с пагинацией
    const paginatePosts = await this.postService.findManyWithPagination(id, options);

    // новый массив для последующего формирования
    const posts = [];

    // сравниваем посты и добавляя в массив устанавливаем флаги
    for (let i = 0; i <= paginatePosts.length - 1; i++) {
      const paginatePost = paginatePosts[i];

      for (let k = 0; k <= paginatePost.likes.length - 1; k++) {
        const userId = paginatePost.likes[k].user?.id;

        if (userId === viewerId) {
          posts.push({ ...paginatePost, likesCount: paginatePost?.likes?.length, isLike: true });
          break;
        }
      }

      if (!posts.find((post) => post?.id === paginatePost?.id)) {
        posts.push({ ...paginatePost, likesCount: paginatePost?.likes?.length, isLike: false });
      }
    }

    // сортируем по дате (id)
    posts.sort((a, b) => b.id - a.id);

    // формируем объект просматривающего, чтобы понимать - имеется ли пользователь в друзьях
    const viewer = {
      isFriend: !!followers.find((user) => user.id === viewerId),
    };

    return { ...user, friends, posts, viewer };
  }

  findOneForAuth(email: string) {
    return this.repository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  update(id: number, dto: UpdateUserDto) {
    return this.repository.update(id, {
      image: dto.image,
      status: dto.status,
      firstName: dto.firstName,
      lastName: dto.lastName,
      university: dto.university,
      age: dto.age,
      city: dto.city,
    });
  }

  updateCover(id: number, cover: string) {
    return this.repository.update(id, {
      cover,
    });
  }

  softDelete(id: number) {
    return this.repository.softDelete(id);
  }

  async findFriendsPostList(userId: number, paginationOptions: PaginationOptions): Promise<Post[]> {
    // получаем информацию о пользователе, который сделал запрос
    const user = await this.repository.findOne({
      where: { id: userId },
      relations: ['following.followingTo.posts.likes.user', 'following.followingTo.posts.user'],
    });

    // формируем список друзей т.к. имеем косяк (нужно изменить систему друзей)
    const followings = [...user.following?.map((item) => item.followingTo)];

    // собираем массив постов друзей с сортировкой и последующей пагинацией
    const friendPosts = followings
      ?.map((friend) => friend.posts)
      .flat(1)
      .sort((a, b) => b.id - a.id)
      .slice((paginationOptions.page - 1) * paginationOptions.limit, paginationOptions.page * paginationOptions.limit);

    // новый массив для последующего формирования
    const posts = [];

    // const posts = friendPosts
    //   .filter((post) => post.likes.map((like) => like.user.id).includes(userId))
    //   .map((post) => ({ ...post, isLike: true }));

    for (let i = 0; i <= friendPosts.length - 1; i++) {
      const friendPost = friendPosts[i];

      for (let k = 0; k <= friendPost?.likes?.length - 1; k++) {
        const likeUserId = friendPost.likes[k].user?.id;

        if (likeUserId === userId) {
          posts.push({ ...friendPost, likesCount: friendPost.likes?.length, isLike: true });
          break;
        }
      }

      if (!posts.find((post) => post?.id === friendPost?.id)) {
        posts.push({ ...friendPost, likesCount: friendPost.likes?.length, isLike: false });
      }
    }

    return posts;
  }

  async findFriends(userId: number): Promise<User[]> {
    const { following } = await this.repository.findOne({
      where: { id: userId },
      relations: ['following.followingTo'],
    });

    // формируем список друзей т.к. имеем косяк (нужно изменить систему друзей)
    const friends = [...following?.map((item) => item.followingTo)];

    return friends;
  }

  async findPossibleFriends(userId: number): Promise<User[]> {
    const tenUsers = await this.repository.find({ where: { id: Not(userId) } });

    const { following } = await this.repository.findOne({
      where: { id: userId },
      relations: ['following.followingTo'],
    });

    // формируем список друзей т.к. имеем косяк (нужно изменить систему друзей)
    const friends = [...following?.map((item) => item.followingTo)];

    const filterUsers = tenUsers.filter((user) => !friends.map((friend) => friend.id).includes(user.id));

    return filterUsers;
  }
}
