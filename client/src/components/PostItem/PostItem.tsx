import { Icon24User } from '@vkontakte/icons';
import { Avatar, RichCell } from '@vkontakte/vkui';
import clsx from 'clsx';
import moment from 'moment';
import { Link } from 'react-router-dom';
import 'moment/locale/ru';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import type { User } from '@/types/user.interface';

import LikeButton from '../LikeButton/LikeButton';

import styles from './PostItem.module.scss';

interface PostItemProps {
  user: User;
  id: number;
  body?: string | null;
  image?: string | null;
  likesCount: number;
  createdAt: Date;
  isLike: boolean;
}

const PostItem: React.FC<PostItemProps> = ({ body, createdAt, id, image, isLike, likesCount, user }) => {
  const date = moment(createdAt).startOf('minutes').fromNow();

  return (
    <div className={clsx(styles.root, 'block-fluid')}>
      <div className={styles.header}>
        <Link to={getPublicUrl.profile(user?.id)}>
          <RichCell before={<Avatar fallbackIcon={<Icon24User />} size={40} src={user?.image} />} caption={date}>
            {user?.firstName} {}
            {user?.lastName}
          </RichCell>
        </Link>
      </div>
      <div className={styles.body}>
        <p>{body}</p>
        {image && (
          <div className={styles.imageContainer}>
            <img alt='Фотография' loading='lazy' src={image} />
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <LikeButton isLike={isLike} likesCount={likesCount} postId={id} />
      </div>
    </div>
  );
};

export default PostItem;
