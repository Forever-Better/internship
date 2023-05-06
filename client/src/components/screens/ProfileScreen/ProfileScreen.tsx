import { Spacing } from '@vkontakte/vkui';
import { useParams } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { useGetUserQuery } from '@/services/user/user.service';

import CreatePostBlock from './CreatePostBlock/CreatePostBlock';
import FriendsBlock from './FriendsBlock/FriendsBlock';
import HeaderBlock from './HeaderBlock/HeaderBlock';
import PostListBlock from './PostListBlock/PostListBlock';
import styles from './ProfileScreen.module.scss';

const ProfileScreen = () => {
  const { userId } = useParams();

  const { user: owner } = useAuth();
  const { data } = useGetUserQuery(Number(userId), { skip: !userId });

  if (!data) return null;

  return (
    <div className={styles.root}>
      <Spacing size={16} />
      <HeaderBlock />
      <Spacing size={16} />
      <div className={styles.container}>
        <div className={styles.postsContainer}>
          <CreatePostBlock userImage={owner?.image} />
          <Spacing size={16} />
          <PostListBlock data={data.posts} />
        </div>{' '}
        <FriendsBlock />
      </div>
    </div>
  );
};

export default ProfileScreen;
