import type { Post } from './post.interface';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  status: string | null;
  age: number | null;
  city: string | null;
  university: string | null;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
  likes: Post[];
  friends: User[];
  cover: string | null;
}
