import { Icon20DeleteOutline } from '@vkontakte/icons';
import { IconButton } from '@vkontakte/vkui';

import { useRemovePostMutation } from '@/services/post/post.service';

interface DeleteButtonProps {
  postId: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ postId }) => {
  const [removePost] = useRemovePostMutation();

  return (
    <IconButton hoverMode='false' onClick={() => removePost(postId)}>
      <Icon20DeleteOutline color='var(--vkui--color_icon_secondary)' />
    </IconButton>
  );
};

export default DeleteButton;
