import { useNavigate } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useAuth } from '@/hooks/useAuth';

const AuthOutlet: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoading, user } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return null;

  if (user) {
    navigate(getPublicUrl.feed());
    return null;
  }

  return <>{children}</>;
};

export default AuthOutlet;
