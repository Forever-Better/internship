import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router-dom';

import intern from '@/assets/intern.jpg';

import styles from './AuthScreen.module.scss';
import './Panel.scss';

const AuthScreen = () => {
  const location = useLocation();

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.imageContainer} style={{ backgroundImage: `url(${intern})` }}>
          {/* <img alt='Intern' src={intern} /> */}
        </div>
        <div className={styles.authContainer}>
          <div className={clsx(styles.item, styles.panel)}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
