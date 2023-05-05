import Cookies from 'js-cookie';

import type { AuthResponse } from '@/store/user/user.interface';
import { Tokens as TokensEnum } from '@/types/enums';
import type { Tokens } from '@/types/tokens.interface';

export const getAccessToken = () => Cookies.get(TokensEnum.ACCESS_TOKEN);

export const getRefreshToken = () => Cookies.get(TokensEnum.REFRESH_TOKEN);

export const getUserFromStorage = (): unknown => JSON.parse(localStorage.getItem('user') || '');

export const saveTokensStorage = (data: Tokens) => {
  Cookies.set(TokensEnum.ACCESS_TOKEN, data.accessToken, {
    expires: 30,
    sameSite: 'Strict',
    secure: true
  });
  Cookies.set(TokensEnum.REFRESH_TOKEN, data.refreshToken, {
    expires: 30,
    sameSite: 'Strict',
    secure: true
  });
};

export const removeFromStorage = () => {
  Cookies.remove(TokensEnum.ACCESS_TOKEN);
  Cookies.remove(TokensEnum.REFRESH_TOKEN);
  localStorage.removeItem('user');
};

export const saveToStorage = (data: AuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};
