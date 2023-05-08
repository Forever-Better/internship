import PostItem from '@/components/PostItem/PostItem';
import type { ModifyPost } from '@/services/user/user.helper';

import styles from './PostListBlock.module.scss';

interface PostListBlockProps {
  posts: ModifyPost[];
}

const PostListBlock: React.FC<PostListBlockProps> = ({ posts }) => (
  <section className={styles.root}>
    {posts.map((post) => (
      <PostItem
        key={post.id}
        body={post.body}
        createdAt={post.createdAt}
        id={post.id}
        image={post.image}
        isLike={post.isLike}
        likesCount={post.likesCount}
        user={post.user}
      />
    ))}
  </section>
);

export default PostListBlock;
