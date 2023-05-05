import { Outlet } from 'react-router-dom';

import OnlyUserOutlet from '@/components/outlets/OnlyUserOutlet';

import Header from './Header/Header';
import NavigationRail from './NavigationRail/NavigationRail';
import styles from './RootLayout.module.scss';

const RootLayout: React.FC = () => (
  <OnlyUserOutlet>
    <Header />
    <div className={styles.root}>
      <div className='container'>
        <aside>
          <NavigationRail />
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  </OnlyUserOutlet>
);

export default RootLayout;
