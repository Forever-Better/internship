import { getApiUrl } from '@/helpers/getApiUrl';

import { api } from '../api/api';

export const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createLike: builder.mutation<void, number>({
      query: (id) => ({
        url: getApiUrl.likePost(+id),
        method: 'POST'
      }),
      invalidatesTags: ['Like']
    }),
    removeLike: builder.mutation<void, number>({
      query: (id) => ({
        url: getApiUrl.likePost(+id),
        method: 'DELETE'
      }),
      invalidatesTags: ['Like']
    })
  })
});

export const { useCreateLikeMutation, useRemoveLikeMutation } = likeApi;
