import { Icon12Verified, Icon28User } from '@vkontakte/icons';
import { Avatar, Group, Header, PanelSpinner, Spacing } from '@vkontakte/vkui';

import FollowButton from '@/components/FollowButton/FollowButton';
import UserCell from '@/components/UserCell/UserCell';
import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useGetFriendListQuery } from '@/services/user/user.service';

import NotFoundPlaceholder from '../NotFoundPlaceholder/NotFoundPlaceholder';

import styles from './FriendListBlock.module.scss';

const FriendListBlock = () => {
  const { data, isLoading } = useGetFriendListQuery();

  if (isLoading) return <PanelSpinner height={380} size='medium' />;

  if (!data) return <NotFoundPlaceholder />;

  return (
    <Group separator='hide'>
      <Header mode='primary' size='large'>
        Список подписок
      </Header>
      <div className={styles.list}>
        {data?.map((friend) => (
          <UserCell
            key={friend.id}
            padding
            after={<FollowButton hasSubscription icon userId={friend.id} />}
            avatar={<Avatar fallbackIcon={<Icon28User />} size={64} src={friend.image} />}
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
      <Spacing size={16} />
    </Group>
  );
};

export default FriendListBlock;
