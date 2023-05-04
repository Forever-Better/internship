import { getApiUrl } from '@/helpers/getApiUrl';
import type { AuthResponse, LoginData, SignupData } from '@/store/user/user.interface';

import { api } from '../api/api';

import { getRefreshToken } from './auth.helper';

export interface LoginRequest {
  username?: string;
  email: string;
  password: string;
}

const refreshToken = getRefreshToken();

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginData>({
      query: (formData: LoginData) => ({
        url: getApiUrl.login(),
        method: 'POST',
        body: formData
      })
    }),
    signup: builder.mutation<AuthResponse, SignupData>({
      query: (formData: SignupData) => ({
        url: getApiUrl.signup(),
        method: 'POST',
        body: formData
      })
    }),
    getNewTokens: builder.query<AuthResponse, void>({
      query: () => ({
        url: getApiUrl.refresh(),
        headers: { authorization: refreshToken ? `Bearer ${refreshToken}` : '' }
      })
    })
  })
});

export const { useLazyGetNewTokensQuery, useLoginMutation, useSignupMutation } = authApi;
