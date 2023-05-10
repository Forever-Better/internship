import { Icon56UserSquareOnSquareOutline } from '@vkontakte/icons';
import { Group, Placeholder } from '@vkontakte/vkui';

const NotFoundPlaceholder = () => (
  <Group>
    <Placeholder header='Мы не нашли ничего для вас' icon={<Icon56UserSquareOnSquareOutline />}>
      Оформляйте подписки на пользователей, чтобы здесь появился контент
    </Placeholder>
  </Group>
);

export default NotFoundPlaceholder;
