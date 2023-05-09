import { getApiUrl } from '@/helpers/getApiUrl';
import type { CreatePostData } from '@/types/create-post-data-interface';
import type { Post } from '@/types/post.interface';

import { api } from '../api/api';

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<Post, CreatePostData>({
      query: (formData: Post) => ({
        url: getApiUrl.createPost(),
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['Post']
    }),
    removePost: builder.mutation<void, number>({
      query: (postId: number) => ({
        url: getApiUrl.removePost(postId),
        method: 'DELETE'
      }),
      invalidatesTags: ['Post']
    })
  })
});

export const { useCreatePostMutation, useRemovePostMutation } = postApi;
