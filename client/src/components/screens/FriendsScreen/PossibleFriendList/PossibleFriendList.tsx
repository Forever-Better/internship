import { Icon12Verified, Icon24User } from '@vkontakte/icons';
import { Avatar, Group, Header, SimpleCell } from '@vkontakte/vkui';
import { Link } from 'react-router-dom';

import FollowButton from '@/components/FollowButton/FollowButton';
import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useGetPossibleFriendsQuery } from '@/services/follow/follow.service';

const PossibleFriendList = () => {
  const { data, isLoading } = useGetPossibleFriendsQuery();

  if (isLoading) return null;

  return (
    <Group>
      <Header mode='primary' size='large'>
        Список друзей
      </Header>
      {data?.length &&
        data?.map((friend) => (
          <Link key={friend.id} to={getPublicUrl.profile(friend.id)}>
            <SimpleCell
              after={<FollowButton hasSubscription icon userId={friend.id} />}
              badgeAfterTitle={<Icon12Verified />}
              before={<Avatar fallbackIcon={<Icon24User />} size={44} src={friend.image} />}
              subtitle='Команда ВКонтакте'
            >
              {friend.firstName}
              {` `}
              {friend.lastName}
            </SimpleCell>
          </Link>
        ))}
    </Group>
  );
};

export default PossibleFriendList;
