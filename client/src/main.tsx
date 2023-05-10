import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import { ThemeProvider } from 'next-themes';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import '@vkontakte/vkui/dist/vkui.css';
import './styles/styles.scss';
import AuthLayout from './components/layouts/AuthLayout/AuthLayout.tsx';
import RootLayout from './components/layouts/RootLayout/RootLayout.tsx';
import AuthProvider from './components/providers/AuthProvider.tsx';
import LoginForm from './components/screens/AuthScreen/LoginForm/LoginForm.tsx';
import SignupForm from './components/screens/AuthScreen/SignupForm/SignupForm.tsx';
import FeedScreen from './components/screens/FeedScreen/FeedScreen.tsx';
import FriendsScreen from './components/screens/FriendsScreen/FriendsScreen.tsx';
import MessengerScreen from './components/screens/MessengerScreen/MessengerScreen.tsx';
import ProfileScreen from './components/screens/ProfileScreen/ProfileScreen.tsx';
import SettingsScreen from './components/screens/SettingsScreen/SettingsScreen.tsx';
import { UrlTemplates } from './lib/urlBuilder.ts';
import { store } from './store/store.ts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />} path={UrlTemplates.Main}>
        <Route element={<FeedScreen />} path={UrlTemplates.Feed} />
        <Route element={<FriendsScreen />} path={UrlTemplates.Friends} />
        <Route element={<ProfileScreen />} path={UrlTemplates.Profile} />
        <Route element={<MessengerScreen />} path={UrlTemplates.Dialogues} />
        <Route element={<SettingsScreen />} path={UrlTemplates.Settings} />
      </Route>
      <Route element={<AuthLayout />} path={UrlTemplates.Login}>
        <Route index element={<LoginForm />} />
        <Route element={<SignupForm />} path={UrlTemplates.Signup} />
      </Route>
    </>
  ),
  { basename: '/internship' }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AuthProvider>
      <ThemeProvider defaultTheme='system'>
        <ConfigProvider>
          <AdaptivityProvider>
            <AppRoot>
              {' '}
              <RouterProvider router={router} />
            </AppRoot>
          </AdaptivityProvider>
        </ConfigProvider>
      </ThemeProvider>
    </AuthProvider>
  </Provider>
);
