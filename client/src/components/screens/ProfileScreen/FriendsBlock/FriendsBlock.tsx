import { Avatar, HorizontalCell } from '@vkontakte/vkui';
import clsx from 'clsx';

import styles from './FriendsBlock.module.scss';

const FriendsBlock = () => (
  <section className={clsx(styles.root, 'block-fluid')}>
    <HorizontalCell key={1} header='Eduard' size='s'>
      <Avatar size={56} />
    </HorizontalCell>
    <HorizontalCell key={1} header='Eduard' size='s'>
      <Avatar size={56} />
    </HorizontalCell>
    <HorizontalCell key={1} header='Eduard' size='s'>
      <Avatar size={56} />
    </HorizontalCell>
    <HorizontalCell key={1} header='Eduard' size='s'>
      <Avatar size={56} />
    </HorizontalCell>
  </section>
);

export default FriendsBlock;
