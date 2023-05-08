import { Icon20User, Icon28DoorArrowRightOutline } from '@vkontakte/icons';
import { Avatar, IconButton } from '@vkontakte/vkui';
import { Link, useNavigate } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';

import Brand from './Brand/Brand';
import styles from './Header.module.scss';
import ThemeButton from './ThemeButton/ThemeButton';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logout } = useActions();

  return (
    <header className={styles.root}>
      <div className='container'>
        <div className={styles.content}>
          <div className={styles.left}>
            <Link to={getPublicUrl.feed()}>
              <Brand />
            </Link>
          </div>
          <div className={styles.right}>
            <ThemeButton />
            {user && (
              <>
                <button onClick={() => navigate(getPublicUrl.profile(user.id))}>
                  <Avatar fallbackIcon={<Icon20User />} size={32} src={user.image} />
                </button>
                <IconButton size={32} width={32} onClick={() => logout()}>
                  <Icon28DoorArrowRightOutline height={24} width={24} />
                </IconButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
