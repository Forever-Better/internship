import clsx from 'clsx';

import PostItem from '@/components/PostItem/PostItem';
import type { Post } from '@/types/post.interface';

import styles from './PostListBlock.module.scss';

interface PostListBlockProps {
  data: Post[];
}

const PostListBlock: React.FC<PostListBlockProps> = ({ data }) => (
  <section className={styles.root}>
    {data.map((post) => (
      <PostItem key={post.id} id={post.id} image={post.image} likesCount={post.likesCount} user={post.user} />
    ))}
  </section>
);

export default PostListBlock;
