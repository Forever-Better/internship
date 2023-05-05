import { useEffect } from 'react';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { getAccessToken, getRefreshToken } from '@/services/auth/auth.helper';
import { useLazyGetNewTokensQuery } from '@/services/auth/auth.service';

const AuthProvider: React.FC<any> = ({ children }) => {
  const { user } = useAuth();
  const { logout } = useActions();
  const [getNewTokens] = useLazyGetNewTokensQuery();

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      getNewTokens();
    }
  }, [getNewTokens]);

  useEffect(() => {
    const refreshToken = getRefreshToken();

    if (!refreshToken && user) {
      logout();
    }
  }, [logout, user]);

  return children;
};

export default AuthProvider;
