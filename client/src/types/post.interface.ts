import type { User } from './user.interface';

export interface Post {
  id: number;
  image?: string | null;
  body?: string | null;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  likes: [];
  likesCount: number;
}
