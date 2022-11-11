import {IRole} from '../interface/role.interface';
import {IPermission} from '../interface/permission.interface';

export const ARRAY_TYPE_IMAGE = ['jpg', 'png', 'gif', 'tiff', 'bmp'];

export const ARRAY_ROLE: IRole[] = [
  {code: 1, label: 'Admin'},
  {code: 2, label: 'MOD'}
];

export const ROLE_ADMIN = 1;
export const ROLE_MOD = 2;

export const ARRAY_PERMISSION: IPermission[] = [
  {code: 'career', label: 'Quản lý ngành nghề'},
  {code: 'group', label: 'Quản lý nhóm'},
  {code: 'post', label: 'Quản lý bài viết'},
  {code: 'account_fb', label: 'Quản lý tài khoản facebook'},
  {code: 'account', label: 'Quản lý tài khoản'},
  {code: 'setting', label: 'Cài đặt'}
];

export const POST_STATUS_WAITING = 0;
export const POST_STATUS_PROCESSING= 1;
export const POST_STATUS_COMPLETE = 2;

// số bản ghi mỗi trang
export const RECORD_PER_PAGE = 10; 

export const FACEBOOK_HOST = 'https://graph.facebook.com';
export const FACEBOOK_DOMAIN = 'https://facebook.com';

export const ACCOUNT_FB_GROUP_STATUS_COMPLETE = 2;
export const ACCOUNT_FB_GROUP_STATUS_PROCESSING = 1;
export const ACCOUNT_FB_GROUP_STATUS_WAITING = 0;
export const ACCOUNT_FB_GROUP_STATUS_ERROR = 9;

export const POST_GROUP_STATUS_COMPLETE = 2;
export const POST_GROUP_STATUS_PROCESSING = 1;
export const POST_GROUP_STATUS_WAITING = 0;
export const POST_GROUP_STATUS_ERROR = 9;

export const COMMENT_STATUS_WAITING = 0;
export const COMMENT_STATUS_PROCESSING = 1;
export const COMMENT_STATUS_COMPLETE = 2;

export const NO_DATA_MESSAGE = 'Không tìm thấy bản ghi';
