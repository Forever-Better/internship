import type { PaginationOptions } from '@/types/pagination-options.interface';
import type { Post } from '@/types/post.interface';
import type { User } from '@/types/user.interface';

export interface Viewer {
  isFriend: boolean;
}

type ProfileData = User & { friends: User[] };

export type ModifyPost = Post & { isLike: boolean };

type Posts = { data: ModifyPost[] } & { hasNextPage: boolean };

export interface GetUserResponse {
  user: ProfileData;
  posts: Posts;
  viewer: Viewer;
}

export type GetFriendsPostListResponse = Posts;

export type GetUserRequest = PaginationOptions & { userId: number };
