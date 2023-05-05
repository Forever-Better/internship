import { Icon24UserCircleOutline, Icon24NewsfeedOutline, Icon24MessageOutline } from '@vkontakte/icons';
import { Link } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useAuth } from '@/hooks/useAuth';

import styles from './NavigationRail.module.scss';
import NavigationRailItem from './NavigationRailItem/NavigationRailItem';

const NavigationRail = () => {
  const { user } = useAuth();

  return (
    <nav className={styles.root}>
      <ul className={styles.list}>
        <li>
          <Link to={getPublicUrl.profile(Number(user?.id))}>
            <NavigationRailItem>
              <Icon24UserCircleOutline />
              Моя страница
            </NavigationRailItem>
          </Link>
        </li>
        <li>
          <Link to={getPublicUrl.feed()}>
            <NavigationRailItem>
              <Icon24NewsfeedOutline />
              Лента
            </NavigationRailItem>
          </Link>
        </li>
        <li>
          <Link to={getPublicUrl.dialogues()}>
            <NavigationRailItem>
              <Icon24MessageOutline />
              Диалоги
            </NavigationRailItem>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationRail;
