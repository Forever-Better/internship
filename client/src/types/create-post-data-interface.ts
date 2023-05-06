import type { Post } from './post.interface';

export type CreatePostData = Pick<Post, 'body' | 'image'>;
