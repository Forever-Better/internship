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
    return `${UrlTemplates.Users}/${userId}`;
  },
  friends() {
    return UrlTemplates.Friends;
  },
  dialogues() {
    return UrlTemplates.Dialogues;
  },
  settings() {
    return UrlTemplates.Settings;
  }
};
