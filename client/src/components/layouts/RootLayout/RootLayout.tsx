import { Outlet } from 'react-router-dom';

import OnlyUserOutlet from '@/components/outlets/OnlyUserOutlet';

import Header from './Header/Header';

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <OnlyUserOutlet>
    <Header />
    <main>
      <Outlet />
    </main>
  </OnlyUserOutlet>
);

export default RootLayout;
