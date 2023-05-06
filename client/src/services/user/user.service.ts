import { getApiUrl } from '@/helpers/getApiUrl';
import type { User } from '@/types/user.interface';

import { api } from '../api/api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, number>({
      query: (id) => getApiUrl.getUser(id)
    })
  })
});

export const { useGetUserQuery } = userApi;
