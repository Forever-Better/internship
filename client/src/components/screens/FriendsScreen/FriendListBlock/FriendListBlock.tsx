import { Icon12Verified, Icon24User, Icon56UsersOutline } from '@vkontakte/icons';
import { Avatar, Group, Header, Placeholder, SimpleCell } from '@vkontakte/vkui';
import { Link } from 'react-router-dom';

import FollowButton from '@/components/FollowButton/FollowButton';
import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useGetFriendListQuery } from '@/services/user/user.service';

const FriendListBlock = () => {
  const { data, isLoading } = useGetFriendListQuery();

  if (isLoading) return null;

  return (
    <Group>
      <Header mode='primary' size='large'>
        Список друзей
      </Header>
      {data?.length ? (
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
        ))
      ) : (
        <Placeholder icon={<Icon56UsersOutline />}>Вы еще не добавили ни одного друга</Placeholder>
      )}
    </Group>
  );
};

export default FriendListBlock;
