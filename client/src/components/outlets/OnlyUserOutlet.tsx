import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useAuth } from '@/hooks/useAuth';

const OnlyUserOutlet: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate(getPublicUrl.login());
    }
  }, [user, navigate]);

  if (isLoading) return null;

  return <>{children}</>;
};

export default OnlyUserOutlet;
