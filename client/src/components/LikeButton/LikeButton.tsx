import { Icon24LikeOutline, Icon28LikeFillRed } from '@vkontakte/icons';
import { Button } from '@vkontakte/vkui';

import { useCreateLikeMutation, useRemoveLikeMutation } from '@/services/like/like.service';
import { useLazyGetUserQuery } from '@/services/user/user.service';

interface LikeButtonProps {
  likesCount: number;
  isLike: boolean;
  postId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLike, likesCount, postId }) => {
  const [createLike] = useCreateLikeMutation();
  const [removeLike] = useRemoveLikeMutation();
  const [getUser] = useLazyGetUserQuery();

  const handleOnClick = () => {
    if (isLike) {
      return removeLike(postId);
    }

    return createLike(postId);
  };

  return (
    <Button
      appearance='neutral'
      before={isLike ? <Icon28LikeFillRed width={24} /> : <Icon24LikeOutline />}
      mode='secondary'
      onClick={handleOnClick}
    >
      {likesCount}
    </Button>
  );
};

export default LikeButton;
