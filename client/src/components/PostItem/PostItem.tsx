import { Icon24User } from '@vkontakte/icons';
import { Avatar, Group } from '@vkontakte/vkui';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ru';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import type { ModifyPost } from '@/services/user/user.helper';
import type { User } from '@/types/user.interface';

import DeleteButton from '../DeleteButton/DeleteButton';
import LikeButton from '../LikeButton/LikeButton';
import UserCell from '../UserCell/UserCell';

import styles from './PostItem.module.scss';

interface PostItemProps {
  user: User;
  post: ModifyPost;
  owner?: boolean | null;
}

const PostItem: React.FC<PostItemProps> = ({ owner = false, post, user }) => {
  const date = moment(post.createdAt).startOf('minutes').fromNow();

  return (
    <Group separator='hide'>
      <div className={clsx(styles.root, 'block-fluid')}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <UserCell
              bold
              avatar={<Avatar fallbackIcon={<Icon24User />} size={40} src={user?.image} />}
              href={getPublicUrl.profile(user.id)}
              subtitle={date}
            >
              {user?.firstName} {}
              {user?.lastName}
            </UserCell>
          </div>
          {owner && <DeleteButton postId={post.id} />}
        </div>
        <div className={styles.body}>
          <p>{post.body}</p>
          {post.image && (
            <div className={styles.imageContainer}>
              <img alt='Фотография' loading='lazy' src={post.image} />
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <LikeButton isLike={post.isLike} likesCount={post.likesCount} postId={post.id} />
        </div>
      </div>
    </Group>
  );
};

export default PostItem;
