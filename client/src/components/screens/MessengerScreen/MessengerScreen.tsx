import { Icon56MessagesOutline } from '@vkontakte/icons';
import { Group, Placeholder, Spacing } from '@vkontakte/vkui';

import styles from './MessengerScreen.module.scss';

const MessengerScreen = () => (
  <div className={styles.root}>
    <Spacing size={16} />
    <div className='layout'>
      <Group separator='hide'>
        <Placeholder header='Список диалогов пуст' icon={<Icon56MessagesOutline />}>
          У вас еще нет активных диалогов
        </Placeholder>
      </Group>
    </div>
  </div>
);

export default MessengerScreen;
