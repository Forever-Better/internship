import { Icon24LogoVkColor, Icon56LogoVkColor } from '@vkontakte/icons';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

import styles from './AuthScreen.module.scss';

const AuthScreen = () => (
  <div className={styles.root}>
    <div className={styles.inner}>
      <div className={styles.logoAndText}>
        <div className={styles.logoWrapper}>
          <Icon56LogoVkColor />
          <span className={styles.text}>Internship</span>
        </div>
      </div>
      <div className={clsx(styles.item, styles.panel)}>
        <div className={clsx(styles.logoWrapper, 'icon-center')}>
          <Icon24LogoVkColor />
          <span className={styles.text}>Internship</span>
        </div>
        <Outlet />
      </div>
    </div>
  </div>
);

export default AuthScreen;
