import { RichCell } from '@vkontakte/vkui';
import clsx from 'clsx';

import type { User } from '@/types/user.interface';

import styles from './PostItem.module.scss';

interface PostItemProps {
  user: User;
  id: number;
  body?: string | null;
  image?: string | null;
  likesCount: number;
}

const PostItem: React.FC<PostItemProps> = ({ body, id, image, likesCount, user }) => (
  <div className={clsx(styles.root, 'block-fluid')}>
    <div className={styles.header}>
      <RichCell>{user.lastName}</RichCell>
    </div>
    <div className={styles.body}>
      {' '}
      <p>{body}</p>
      {image && (
        <div className={styles.imageContainer}>
          <img alt='Фотография' loading='lazy' src={image} />
        </div>
      )}
    </div>
  </div>
);

export default PostItem;
