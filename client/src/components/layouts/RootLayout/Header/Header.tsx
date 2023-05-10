import { Link } from 'react-router-dom';

import UserNavPopover from '@/components/UserNavPopover/UserNavPopover';
import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useAuth } from '@/hooks/useAuth';

import Brand from './Brand/Brand';
import styles from './Header.module.scss';

const Header = () => {
  const { user } = useAuth();

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
            {/* <ThemeButton /> */}
            {user && <UserNavPopover />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
