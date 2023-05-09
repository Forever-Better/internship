import { getApiUrl } from '@/helpers/getApiUrl';
import type { PaginationOptions } from '@/types/pagination-options.interface';
import type { User } from '@/types/user.interface';

import { api } from '../api/api';

import type { GetUserResponse, GetUserRequest, GetFriendsPostListResponse } from './user.helper';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<GetUserResponse, GetUserRequest>({
      query: ({ userId, ...options }) => getApiUrl.getUser(userId, options),
      providesTags: ['Post', 'Friend']
    }),
    getFriendsPostList: builder.query<GetFriendsPostListResponse, PaginationOptions>({
      query: (options) => getApiUrl.getFriendsPostList(options),
      keepUnusedDataFor: 600,
      providesTags: ['Post', 'Friend']
    }),
    getFriendList: builder.query<User[], void>({
      query: () => getApiUrl.getFriends(),
      providesTags: ['Friend']
    }),
    getPossibleFriends: builder.query<User[], void>({
      query: () => getApiUrl.getPossibleFriends(),
      providesTags: ['Friend']
    })
  })
});

export const {
  useGetFriendListQuery,
  useGetFriendsPostListQuery,
  useGetPossibleFriendsQuery,
  useGetUserQuery,
  useLazyGetUserQuery
} = userApi;
