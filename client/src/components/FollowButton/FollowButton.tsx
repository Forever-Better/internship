import { Icon24UserAddedOutline, Icon28UserAddedOutline, Icon28UserAddOutline } from '@vkontakte/icons';
import { Button, IconButton } from '@vkontakte/vkui';

import { useFollowMutation, useUnfollowMutation } from '@/services/follow/follow.service';

interface FollowButtonProps {
  userId: number;
  hasSubscription: boolean;
  icon: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({ hasSubscription, icon, userId }) => {
  const [follow] = useFollowMutation();
  const [unFollow] = useUnfollowMutation();

  const handleOnClick = () => {
    if (hasSubscription) {
      return unFollow(userId);
    }

    return follow(userId);
  };

  if (icon) {
    return (
      <IconButton onClick={handleOnClick}>
        {hasSubscription ? <Icon28UserAddedOutline /> : <Icon28UserAddOutline />}
      </IconButton>
    );
  }

  return hasSubscription ? (
    <Button before={<Icon24UserAddedOutline />} mode='secondary' onClick={handleOnClick} />
  ) : (
    <Button appearance='neutral' size='l' onClick={handleOnClick}>
      Подписаться
    </Button>
  );
};

export default FollowButton;
