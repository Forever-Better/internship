import { getApiUrl } from '@/helpers/getApiUrl';
import type { Post } from '@/types/post.interface';

import { api } from '../api/api';

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<Post, Post>({
      query: (formData: Post) => ({
        url: getApiUrl.createPost(),
        method: 'POST',
        body: formData
      })
    })
  })
});

export const { useCreatePostMutation } = postApi;