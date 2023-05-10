import { Icon56GhostOutline } from '@vkontakte/icons';
import { Group, Placeholder, Spacing } from '@vkontakte/vkui';

const NotFoundPlaceholder = () => (
  <>
    <Spacing size={16} />
    <Group>
      <Placeholder header='Пользователь не найден' icon={<Icon56GhostOutline />}>
        Нам не удалось найти пользователя с данным идентификатором
      </Placeholder>
    </Group>
  </>
);

export default NotFoundPlaceholder;
