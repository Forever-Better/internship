import { Icon56UserSquareOnSquareOutline } from '@vkontakte/icons';
import { Button, Placeholder, Spacing } from '@vkontakte/vkui';
import { useState } from 'react';

import PostItem from '@/components/PostItem/PostItem';
import { useGetFriendsPostListQuery } from '@/services/user/user.service';

import styles from './FeedScreen.module.scss';

const FeedScreen = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetFriendsPostListQuery({ page, limit: 3 });

  if (isLoading) return null;

  return (
    <div className={styles.root}>
      <Spacing size={16} />
      <section className={styles.postsContainer}>
        {data?.data.length ? (
          data?.data?.map((post) => (
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
          ))
        ) : (
          <Placeholder icon={<Icon56UserSquareOnSquareOutline />}>
            Добавьте новых друзей, чтобы здесть появился контент
          </Placeholder>
        )}
      </section>
      <Button onClick={() => setPage((v) => v + 1)}>get more</Button>
    </div>
  );
};

export default FeedScreen;
