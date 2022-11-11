import {IAccountFb} from './account-fb.interface';

export interface IComment {
  _id: string;
  fbid?: string;
  content: string;
  comment_type?: number; // 0 comment 1 inbox

  account_fb_id?: string; // tai khoan he thong
  account_fbid?: string; // tai khoan he thong
  account_send_fbid?: string; // tai khoan binh luan
  account_send_name?: string; // tai khoan binh luan

  post_id?: string;
  post_fbid?: string;
  last_action_time?: string;
  status?: number;
  created?: number;
  sub_comments?: IComment[];
  postGroup?: any;
  accountFb?: IAccountFb[];
  group_id: string;
  group_fbid; string;
}
