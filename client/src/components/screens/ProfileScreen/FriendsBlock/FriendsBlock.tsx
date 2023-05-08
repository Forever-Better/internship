import { Icon28User, Icon56UsersOutline } from '@vkontakte/icons';
import { Avatar, HorizontalCell, Placeholder } from '@vkontakte/vkui';
import clsx from 'clsx';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import type { User } from '@/types/user.interface';

import styles from './FriendsBlock.module.scss';

const FriendsBlock: React.FC<{ data: User[] }> = ({ data }) => (
  <section className={clsx(styles.root, 'block-fluid')}>
    <div className={styles.header}>
      Друзья <span className={styles.count}>{data?.length}</span>
    </div>
    {data.length ? (
      data.map((user) => (
        <HorizontalCell key={user.id} header={user.firstName} href={getPublicUrl.profile(user.id)} size='s'>
          <Avatar fallbackIcon={<Icon28User />} size={56} src={user.image} />
        </HorizontalCell>
      ))
    ) : (
      <Placeholder header='У пользователя нет друзей' icon={<Icon56UsersOutline />} />
    )}
  </section>
);

export default FriendsBlock;
