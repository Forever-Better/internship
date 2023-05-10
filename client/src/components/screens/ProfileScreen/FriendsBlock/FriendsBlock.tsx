import { Icon28User, Icon56UsersOutline } from '@vkontakte/icons';
import { Avatar, Group, HorizontalCell, Placeholder } from '@vkontakte/vkui';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import type { User } from '@/types/user.interface';

import styles from './FriendsBlock.module.scss';

const FriendsBlock: React.FC<{ data: User[] }> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <section>
      <Group separator='hide'>
        <div className={clsx(styles.root, 'block')}>
          {' '}
          <div className={styles.header}>
            Друзья <span className={styles.count}>{data?.length}</span>
          </div>
          {data.length ? (
            <div className={styles.friendList}>
              {data.map((user) => (
                <HorizontalCell
                  key={user.id}
                  header={user.firstName}
                  size='s'
                  onClick={() => navigate(getPublicUrl.profile(user.id))}
                >
                  <Avatar fallbackIcon={<Icon28User />} size={56} src={user.image} />
                </HorizontalCell>
              ))}
            </div>
          ) : (
            <Placeholder header='У пользователя нет друзей' icon={<Icon56UsersOutline />} />
          )}
        </div>
      </Group>
    </section>
  );
};

export default FriendsBlock;
