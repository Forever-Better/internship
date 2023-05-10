import { Spacing } from '@vkontakte/vkui';

import styles from './FeedScreen.module.scss';
import PostListBlock from './PostListBlock/PostListBlock';

const FeedScreen = () => (
  <div className={styles.root}>
    <Spacing size={16} />
    <div className='layout'>
      <PostListBlock />
    </div>
  </div>
);

export default FeedScreen;
