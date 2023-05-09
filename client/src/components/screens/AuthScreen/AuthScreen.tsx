import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

import intern from '@/assets/intern.jpg';

import styles from './AuthScreen.module.scss';
import './Panel.scss';

const AuthScreen = () => (
  <div className={styles.root}>
    <div className={styles.content}>
      <div className={styles.imageContainer} style={{ backgroundImage: `url(${intern})` }} />
      <div className={styles.authContainer}>
        <div className={clsx(styles.item, styles.panel)}>
          <Outlet />
        </div>
      </div>
    </div>
  </div>
);

export default AuthScreen;
