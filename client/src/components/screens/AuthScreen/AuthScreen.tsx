import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

import styles from './AuthScreen.module.scss';

const AuthScreen = () => (
  <div className={styles.root}>
    <div className={styles.inner}>
      <div className={clsx(styles.item, styles.panel)}>
        <Outlet />
      </div>
    </div>
  </div>
);

export default AuthScreen;
