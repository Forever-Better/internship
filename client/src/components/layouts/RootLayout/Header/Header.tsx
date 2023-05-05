import { Icon32LogoVkColor, Icon28DoorArrowRightOutline, Icon28User } from '@vkontakte/icons';
import { Avatar, IconButton } from '@vkontakte/vkui';
import { useNavigate } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';

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
            <div className={styles.brand}>
              <Icon32LogoVkColor />
              <span className={styles.label}>Internship</span>
            </div>
          </div>
          <div className={styles.right}>
            <ThemeButton />
            {user && (
              <>
                <button onClick={() => navigate(getPublicUrl.profile(user.id))}>
                  <Avatar fallbackIcon={<Icon28User />} size={32} src={user.image} />
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
