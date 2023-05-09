import { Icon56MessagesOutline } from '@vkontakte/icons';
import { Group, Placeholder, Spacing } from '@vkontakte/vkui';

const MessengerScreen = () => (
  <div>
    <Spacing size={16} />
    <Group separator='hide'>
      <Placeholder header='Список диалогов пуст' icon={<Icon56MessagesOutline />}>
        У вас еще нет активных диалогов
      </Placeholder>
    </Group>
  </div>
);

export default MessengerScreen;
