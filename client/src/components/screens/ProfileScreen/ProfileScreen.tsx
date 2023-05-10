import { PanelSpinner, Spacing } from '@vkontakte/vkui';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { useGetUserQuery } from '@/services/user/user.service';

import CreatePostBlock from './CreatePostBlock/CreatePostBlock';
import FriendsBlock from './FriendsBlock/FriendsBlock';
import HeaderBlock from './HeaderBlock/HeaderBlock';
import NotFoundPlaceholder from './NotFoundPlaceholder/NotFoundPlaceholder';
import PostListBlock from './PostListBlock/PostListBlock';
import styles from './ProfileScreen.module.scss';

const ProfileScreen = () => {
  const { userId } = useParams();

  const { user: owner } = useAuth();
  const { data, error, isLoading } = useGetUserQuery(
    { userId: Number(userId), page: 1, limit: 50 },
    { skip: !userId, refetchOnMountOrArgChange: true }
  );

  if (isLoading) return <PanelSpinner height={620} size='large' />;

  if (!data) return null;

  if (error) return <NotFoundPlaceholder />;

  const isOwner = owner?.id === data.user.id;

  return (
    <div className={styles.root}>
      <Spacing size={16} />
      <HeaderBlock info={data.user} isOwner={isOwner} isSubscribe={data.viewer.isFriend} />
      <Spacing size={16} />
      <div className={clsx(styles.container, 'layout')}>
        <div className={styles.postsContainer}>
          {isOwner && (
            <>
              <CreatePostBlock userImage={owner?.image} />
              <Spacing size={16} />
            </>
          )}
          <PostListBlock owner={isOwner} posts={data.posts.data} />
        </div>{' '}
        <FriendsBlock data={data.user.friends} />
      </div>
    </div>
  );
};

export default ProfileScreen;
