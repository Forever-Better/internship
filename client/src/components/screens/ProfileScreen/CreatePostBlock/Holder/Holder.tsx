import { Icon16User } from '@vkontakte/icons';
import { Avatar, Group } from '@vkontakte/vkui';

import styles from './Holder.module.scss';

interface HolderProps {
  userImage?: string;
  setActiveWriteBlock: React.Dispatch<React.SetStateAction<boolean>>;
}

const Holder: React.FC<HolderProps> = ({ setActiveWriteBlock, userImage }) => (
  <Group separator='hide'>
    <button className={styles.root} onClick={() => setActiveWriteBlock(true)}>
      <Avatar fallbackIcon={<Icon16User />} size={28} src={userImage} />
      <span>Сегодня я расскажу вам...</span>
    </button>
  </Group>
);

export default Holder;
