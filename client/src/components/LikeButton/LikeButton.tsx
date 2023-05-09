import { Icon28LikeOutline, Icon28LikeFillRed } from '@vkontakte/icons';
import { IconButton } from '@vkontakte/vkui';
import clsx from 'clsx';
import { useState } from 'react';

import { useCreateLikeMutation, useRemoveLikeMutation } from '@/services/like/like.service';

import styles from './LikeButton.module.scss';

interface LikeButtonProps {
  likesCount: number;
  isLike: boolean;
  postId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLike, likesCount: count, postId }) => {
  const [likeStatus, setLikeStatus] = useState(isLike);
  const [likesCount, setLikesCount] = useState(count);
  const [createLike] = useCreateLikeMutation();
  const [removeLike] = useRemoveLikeMutation();

  const handleOnClick = () => {
    if (likeStatus) {
      return removeLike(postId)
        .unwrap()
        .then(() => {
          setLikeStatus(false);
          setLikesCount((prev) => prev - 1);
        });
    }

    return createLike(postId)
      .unwrap()
      .then(() => {
        setLikeStatus(true);
        setLikesCount((prev) => prev + 1);
      });
  };

  return (
    <IconButton activeMode='true' className={styles.likeButton} onClick={handleOnClick}>
      {likeStatus ? <Icon28LikeFillRed /> : <Icon28LikeOutline color='var(--vkui--color_icon_medium)' />}
      {likesCount > 0 && <span className={clsx(styles.label, likeStatus && styles.red)}>{likesCount}</span>}
    </IconButton>
  );
};

export default LikeButton;
