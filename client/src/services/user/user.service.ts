import { getApiUrl } from '@/helpers/getApiUrl';
import type { PaginationOptions } from '@/types/pagination-options.interface';
import type { UpdateProfileData } from '@/types/update-profile-data.interface';
import type { User } from '@/types/user.interface';

import { api } from '../api/api';

import type { GetUserResponse, GetUserRequest, GetFriendsPostListResponse } from './user.helper';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => getApiUrl.getMe()
    }),
    updateMe: builder.mutation<void, UpdateProfileData>({
      query: (formData) => ({
        url: getApiUrl.getMe(),
        method: 'PATCH',
        body: formData
      }),
      invalidatesTags: ['User']
    }),
    updateCover: builder.mutation<void, string | null>({
      query: (cover) => ({
        url: getApiUrl.updateCover(),
        method: 'PATCH',
        body: { cover }
      }),
      invalidatesTags: ['User']
    }),
    getUser: builder.query<GetUserResponse, GetUserRequest>({
      query: ({ userId, ...options }) => getApiUrl.getUser(userId, options),
      providesTags: ['Post', 'Friend', 'User']
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
  useGetMeQuery,
  useGetPossibleFriendsQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateCoverMutation,
  useUpdateMeMutation
} = userApi;
