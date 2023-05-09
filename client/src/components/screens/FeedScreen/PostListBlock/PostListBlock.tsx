import { Icon56UserSquareOnSquareOutline } from '@vkontakte/icons';
import { Placeholder } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import PostItem from '@/components/PostItem/PostItem';
import type { ModifyPost } from '@/services/user/user.helper';
import { useGetFriendsPostListQuery } from '@/services/user/user.service';

import styles from './PostListBlock.module.scss';

const PostListBlock = () => {
  const [page, setPage] = useState(1);
  const { data: resData, isLoading } = useGetFriendsPostListQuery({ page, limit: 10 });
  const [data, setData] = useState<ModifyPost[]>([]);

  const { inView, ref } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (resData?.data) {
      setData((prev) => [...prev, ...resData.data]);
    }
  }, [resData]);

  useEffect(() => {
    if (data && inView && resData?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [inView, resData, data]);

  if (isLoading) return null;

  return (
    <section className={styles.root}>
      {data?.length ? (
        data?.map((post) => <PostItem key={post.id} post={post} user={post.user} />)
      ) : (
        <Placeholder
          className={styles.placeholder}
          header='Мы не нашли ничего для вас'
          icon={<Icon56UserSquareOnSquareOutline />}
        >
          Добавьте новых друзей, чтобы здесь появился контент
        </Placeholder>
      )}
      {data && !isLoading && <div ref={ref} />}
    </section>
  );
};

export default PostListBlock;
