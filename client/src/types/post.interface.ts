export interface Post {
  id: number;
  image: string;
  body: string;
  user: '{}';
  createdAt: Date;
  updatedAt: Date;
  likes: [];
  likesCount: number;
}
