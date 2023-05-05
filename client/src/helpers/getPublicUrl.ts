import { UrlTemplates } from '@/lib/urlBuilder';

export const getPublicUrl = {
  login() {
    return UrlTemplates.Login;
  },
  signup() {
    return UrlTemplates.Signup;
  },
  feed() {
    return UrlTemplates.Feed;
  },
  profile(userId: number) {
    return `${UrlTemplates.Profile}/${userId}`;
  }
};
