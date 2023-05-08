import type { Post } from './post.interface';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
  likes: Post[];
  following: User[];
  followers: User[];
}
