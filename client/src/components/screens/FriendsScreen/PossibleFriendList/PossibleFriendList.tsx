import { Icon12Verified, Icon24User } from '@vkontakte/icons';
import { Avatar, Group, Header } from '@vkontakte/vkui';

import FollowButton from '@/components/FollowButton/FollowButton';
import UserCell from '@/components/UserCell/UserCell';
import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useGetPossibleFriendsQuery } from '@/services/user/user.service';

const PossibleFriendList = () => {
  const { data, isLoading } = useGetPossibleFriendsQuery();

  if (isLoading) return null;

  if (!data?.length) return null;

  return (
    <Group separator='hide'>
      <Header mode='primary' size='large'>
        Можете подписаться
      </Header>
      {data?.map((friend) => (
        <UserCell
          key={friend.id}
          padding
          after={<FollowButton icon hasSubscription={false} userId={friend.id} />}
          avatar={<Avatar fallbackIcon={<Icon24User />} size={44} src={friend.image} />}
          badgeAfterTitle={<Icon12Verified />}
          href={getPublicUrl.profile(friend.id)}
          subtitle='Команда ВКонтакте'
        >
          {friend.firstName}
          {` `}
          {friend.lastName}
        </UserCell>
      ))}
    </Group>
  );
};

export default PossibleFriendList;
