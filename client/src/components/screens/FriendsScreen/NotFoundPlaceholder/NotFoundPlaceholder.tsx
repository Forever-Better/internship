import { Icon56UsersOutline } from '@vkontakte/icons';
import { Group, Placeholder } from '@vkontakte/vkui';

const NotFoundPlaceholder = () => (
  <Group>
    <Placeholder header='Список друзей пуст' icon={<Icon56UsersOutline />}>
      Вы еще не добавили ни одного друга
    </Placeholder>
  </Group>
);

export default NotFoundPlaceholder;
