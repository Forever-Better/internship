import PostItem from '@/components/PostItem/PostItem';
import type { ModifyPost } from '@/services/user/user.helper';

import styles from './PostListBlock.module.scss';

interface PostListBlockProps {
  posts: ModifyPost[];
  owner?: boolean | null;
}

const PostListBlock: React.FC<PostListBlockProps> = ({ owner, posts }) => (
  <section className={styles.root}>
    {posts.map((post) => (
      <PostItem key={post.id} owner={owner} post={post} user={post.user} />
    ))}
  </section>
);

export default PostListBlock;
