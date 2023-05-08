import { Icon16User } from '@vkontakte/icons';
import { Avatar } from '@vkontakte/vkui';
import clsx from 'clsx';

import styles from './Holder.module.scss';

interface HolderProps {
  userImage?: string;
  setActiveWriteBlock: React.Dispatch<React.SetStateAction<boolean>>;
}

const Holder: React.FC<HolderProps> = ({ setActiveWriteBlock, userImage }) => (
  <button className={clsx(styles.root, 'block-fluid')} onClick={() => setActiveWriteBlock(true)}>
    <Avatar fallbackIcon={<Icon16User />} size={28} src={userImage} />
    <span>Сегодня я расскажу вам...</span>
  </button>
);

export default Holder;
