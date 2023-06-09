
// types of templates collection:
export type Templates = Template[];
export interface Template {
  _id: string;
  title: string;
  template_id: string;
  html: string;
  css: string;
  js: string;
  isGuest: boolean;
  isPrivate: boolean;
  __v: number;
  user: User;
}
// type of user collection:
export interface User {
  user_otp: UserOtp;
  _id: string;
  full_name: string;
  email: string;
  password: string;
  phone: number;
  pinned_items: PinnedItem[];
  followers: Follower[];
  following: Following[];
  is_spam: boolean;
  is_disabled: boolean;
  otp_verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface UserOtp {}
export interface PinnedItem {}
export interface Follower {}
export interface Following {}