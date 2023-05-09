import { Spacing } from '@vkontakte/vkui';

import styles from './FeedScreen.module.scss';
import PostListBlock from './PostListBlock/PostListBlock';

const FeedScreen = () => (
  <div className={styles.root}>
    <Spacing size={16} />
    <PostListBlock />
  </div>
);

export default FeedScreen;
