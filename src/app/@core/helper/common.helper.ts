import {ToastrService} from 'ngx-toastr';
import {POST_STATUS_COMPLETE, POST_STATUS_PROCESSING} from '../constants/app.constant';
import {MomentInputObject} from 'moment';

export const isDefined = obj => obj !== undefined && obj !== null;

export function showToast(toast: ToastrService , title?: string, message?: string, type?: string) {
  switch (type) {
    case 'success':
      toast.success(message, title);
      break;
    case 'error':
      toast.error(message, title);
      break;
    case 'warning':
      toast.warning(message, title);
      break;
    case 'info':
      toast.info(message, title);
      break;
    default:
      toast.success(message, title);
      break;
  }
}

export function deepClone(data) {
  if (data) {
    return JSON.parse(JSON.stringify(data));
  }
  return null;
}

export function checkFileValid(file: File, array): boolean {
  let check = true;

  const fileTypeArr = file.name.split('.');
  const last = fileTypeArr.length - 1;
  const fileType = fileTypeArr[last].toLowerCase();

  if (array.indexOf(fileType) < 0) {
    return check = false;
  }

  return check;
}

export function getPostStatus(postStatus) {
  if (postStatus === POST_STATUS_COMPLETE) {
    return 'Đăng thành công';
  }

  if (postStatus === POST_STATUS_PROCESSING) {
    return 'Đang chờ duyệt';
  }

  return 'Chưa đăng';
}
