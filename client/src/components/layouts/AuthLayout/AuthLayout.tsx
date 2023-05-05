import AuthOutlet from '@/components/outlets/AuthOutlet';
import AuthScreen from '@/components/screens/AuthScreen/AuthScreen';

const AuthLayout: React.FC<React.PropsWithChildren> = () => (
  <AuthOutlet>
    <AuthScreen />
  </AuthOutlet>
);

export default AuthLayout;
