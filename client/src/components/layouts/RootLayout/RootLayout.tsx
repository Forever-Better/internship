import { useMediaPredicate } from 'react-media-hook';
import { Outlet } from 'react-router-dom';

import OnlyUserOutlet from '@/components/outlets/OnlyUserOutlet';

import Header from './Header/Header';
import NavigationRail from './NavigationRail/NavigationRail';
import styles from './RootLayout.module.scss';

const RootLayout: React.FC = () => {
  const fromTablet = useMediaPredicate('(min-width: 1024px)');

  return (
    <OnlyUserOutlet>
      <Header />
      <div className='container'>
        <div className={styles.root}>
          {fromTablet && (
            <aside className={styles.aside}>
              <NavigationRail />
            </aside>
          )}
          <main>
            <Outlet />
          </main>
          <footer className={styles.footer} />
        </div>
      </div>
    </OnlyUserOutlet>
  );
};

export default RootLayout;
