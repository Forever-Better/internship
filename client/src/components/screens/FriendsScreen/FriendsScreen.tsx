import { Spacing } from '@vkontakte/vkui';
import clsx from 'clsx';

import FriendListBlock from './FriendListBlock/FriendListBlock';
import styles from './FriendsScreen.module.scss';
import PossibleFriendList from './PossibleFriendList/PossibleFriendList';

const FriendsScreen = () => (
  <div className={styles.root}>
    <Spacing size={16} />
    <div className={clsx(styles.content, 'layout')}>
      <FriendListBlock />
      <div className={styles.fixed}>
        <PossibleFriendList />
      </div>
    </div>
  </div>
);

export default FriendsScreen;
