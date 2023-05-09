import { getApiUrl } from '@/helpers/getApiUrl';

import { api } from '../api/api';

export const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
    follow: builder.mutation<void, number>({
      query: (id) => ({
        url: getApiUrl.followUser(+id),
        method: 'POST'
      }),
      invalidatesTags: ['Friend']
    }),
    unfollow: builder.mutation<void, number>({
      query: (id) => ({
        url: getApiUrl.followUser(+id),
        method: 'DELETE'
      }),
      invalidatesTags: ['Friend']
    })
  })
});

export const { useFollowMutation, useUnfollowMutation } = followApi;
