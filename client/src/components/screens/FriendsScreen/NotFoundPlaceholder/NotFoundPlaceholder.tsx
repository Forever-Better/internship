import { Icon56UsersOutline } from '@vkontakte/icons';
import { Group, Placeholder } from '@vkontakte/vkui';

const NotFoundPlaceholder = () => (
  <Group>
    <Placeholder header='Список подписок пуст' icon={<Icon56UsersOutline />}>
      Вы еще не подписались ни на одного пользователя
    </Placeholder>
  </Group>
);

export default NotFoundPlaceholder;
