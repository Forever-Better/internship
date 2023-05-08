import { ApiUrlTemplates } from '@/lib/apiUrlBuilder';
import type { PaginationOptions } from '@/types/pagination-options.interface';

const PAGINATION = (options: PaginationOptions) => `page=${options.page}&limit=${options.limit}`;

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
  getUser(userId: number, options: PaginationOptions) {
    return `${ApiUrlTemplates.Users}/${userId}?${PAGINATION(options)}`;
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
  },
  getFriendsPostList(options: PaginationOptions) {
    return `${ApiUrlTemplates.Users}/friends/posts?${PAGINATION(options)}`;
  },
  getFriends() {
    return `${ApiUrlTemplates.Users}/friends`;
  },
  getPossibleFriends() {
    return `${ApiUrlTemplates.Users}/0/friends`;
  }
};
