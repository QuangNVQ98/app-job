import { environment } from '../../../environments/environment';

/**
 * URL API CAREER
 */
export const CAREER_GET_LIST = environment.base_url_api + 'api/career/get-list';
export const CAREER_SAVE = environment.base_url_api + 'api/career/save';
export const CAREER_DELETE = environment.base_url_api + 'api/career/delete';
export const CAREER_GET_BY_ID = environment.base_url_api + 'api/career/get-by-id';

/**
 * URL API GROUP
 */
export const GROUP_GET_LIST = environment.base_url_api + 'api/group/get-list';
export const GROUP_SAVE = environment.base_url_api + 'api/group/save';
export const GROUP_DELETE = environment.base_url_api + 'api/group/delete';
export const GROUP_GET_BY_ID = environment.base_url_api + 'api/group/get-by-id';
export const GROUP_SEARCH = environment.base_url_api + 'api/group/search';
export const GROUP_CHANGE_STATUS = environment.base_url_api + 'api/group/change-status';
export const GROUP_GET_MEMBER_BY_STATUS = environment.base_url_api + 'api/group/get-member-by-status';
export const GROUP_GET_LIST_BY_CAREER = environment.base_url_api + 'api/group/get-list-by-career';

/**
 * URL ACCOUNT FB
 */
export const ACCOUNT_FB_GET_LIST = environment.base_url_api + 'api/account-fb/get-list';
export const ACCOUNT_FB_SAVE = environment.base_url_api + 'api/account-fb/save';
export const ACCOUNT_FB_DELETE = environment.base_url_api + 'api/account-fb/delete';
export const ACCOUNT_FB_GET_BY_ID = environment.base_url_api + 'api/account-fb/get-by-id';
export const ACCOUNT_FB_GROUP_BY_STATUS = environment.base_url_api + 'api/account-fb/get-group-by-status';
export const ACCOUNT_FB_GET_LIST_POST = environment.base_url_api + 'api/account-fb/get-list-post';

/**
 * URL ACCOUNT
 */
export const ACCOUNT_GET_LIST = environment.base_url_api + 'api/account/get-list';
export const ACCOUNT_SAVE = environment.base_url_api + 'api/account/save';
export const ACCOUNT_DELETE = environment.base_url_api + 'api/account/delete';
export const ACCOUNT_GET_BY_ID = environment.base_url_api + 'api/account/get-by-id';
export const ACCOUNT_UPDATE_PROFILE = environment.base_url_api + 'api/account/update-profile';
export const ACCOUNT_CHANGE_PASSWORD = environment.base_url_api + 'api/account/change-password';

/**
 * URL POST
 */
export const POST_GET_LIST = environment.base_url_api + 'api/post/get-list';
export const POST_SAVE = environment.base_url_api + 'api/post/save';
export const POST_DELETE = environment.base_url_api + 'api/post/delete';
export const POST_GET_BY_ID = environment.base_url_api + 'api/post/get-by-id';
export const POST_GROUP_BY_STATUS = environment.base_url_api + 'api/post/get-group-by-status';
export const POST_GET_COMMENT = environment.base_url_api + 'api/post/get-comment';
export const POST_SEND_COMMENT = environment.base_url_api + 'api/post/send-comment';

/**
 * URL AUTH
 */
export const AUTH_LOGIN = environment.base_url_api + 'api/auth/login';
export const AUTH_CHECK_TOKEN = environment.base_url_api + 'api/auth/check-token';
export const AUTH_FORGOT_PASSWORD = environment.base_url_api + 'api/auth/forgot-password';
export const AUTH_RESET_PASSWORD = environment.base_url_api + 'api/auth/reset-password';

/**
 * URL SETTING
 */
export const SETTING_GET_SETTING = environment.base_url_api + 'api/setting/get-setting';
export const SETTING_GET_SAVE = environment.base_url_api + 'api/setting/save';
