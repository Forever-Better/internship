import type { Post } from './post.interface';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  status: string;
  age: number;
  city: string;
  university: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
  likes: Post[];
  friends: User[];
  cover: string;
}
