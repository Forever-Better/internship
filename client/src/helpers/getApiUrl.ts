import { ApiUrlTemplates } from '@/lib/apiUrlBuilder';

export const getApiUrl = {
  login() {
    return ApiUrlTemplates.Login;
  },
  signup() {
    return ApiUrlTemplates.Signup;
  },
  refresh() {
    return ApiUrlTemplates.Refresh;
  },
  getUser(userId: number) {
    return `${ApiUrlTemplates.Users}/${userId}`;
  },
  followUser(userId: number) {
    return `${ApiUrlTemplates.Users}/${userId}/followers`;
  },
  createPost() {
    return ApiUrlTemplates.Posts;
  },
  likePost(postId: number) {
    return `${ApiUrlTemplates.Posts}/${postId}/likes`;
  },
  removeLikePost(postId: number) {
    return `${ApiUrlTemplates.Posts}/${postId}/likes`;
  },
  fileUpload() {
    return ApiUrlTemplates.FilesUpload;
  }
};
