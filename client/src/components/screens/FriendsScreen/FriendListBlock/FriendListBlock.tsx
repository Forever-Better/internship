import { Icon12Verified, Icon24User, Icon56UsersOutline } from '@vkontakte/icons';
import { Avatar, Group, Header, Placeholder } from '@vkontakte/vkui';

import FollowButton from '@/components/FollowButton/FollowButton';
import UserCell from '@/components/UserCell/UserCell';
import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useGetFriendListQuery } from '@/services/user/user.service';

import styles from './FriendListBlock.module.scss';

const FriendListBlock = () => {
  const { data, isLoading } = useGetFriendListQuery();

  if (isLoading) return null;

  return (
    <Group separator='hide'>
      <Header mode='primary' size='large'>
        Список друзей
      </Header>
      {data?.length ? (
        <div className={styles.list}>
          {data?.map((friend) => (
            <UserCell
              key={friend.id}
              padding
              after={<FollowButton hasSubscription icon userId={friend.id} />}
              avatar={<Avatar fallbackIcon={<Icon24User />} size={64} src={friend.image} />}
              badgeAfterTitle={<Icon12Verified />}
              href={getPublicUrl.profile(friend.id)}
              subtitle='Команда ВКонтакте'
            >
              {friend.firstName}
              {` `}
              {friend.lastName}
            </UserCell>
          ))}
        </div>
      ) : (
        <Placeholder icon={<Icon56UsersOutline />}>Вы еще не добавили ни одного друга</Placeholder>
      )}
    </Group>
  );
};

export default FriendListBlock;
