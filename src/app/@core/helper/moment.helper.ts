import * as moment from 'moment';
import {MomentInputObject} from 'moment';

export function getUnixTimeStamp(dateObject, timeObject?) {
  const momentInput: MomentInputObject = {
    year: dateObject.year,
    month: dateObject.month - 1, // -1 de lay dung index cua thang
    day: dateObject.day,
    hour: timeObject && timeObject.hour ? timeObject.hour : 0,
    minute: timeObject && timeObject.minute ? timeObject.minute : 0,
    second: timeObject && timeObject.second ? timeObject.second : 0
  };

  return moment(momentInput).unix();
}

export function getDateFromUnixTimestamp(unixTimeStamp) {
  const dateValue = moment.unix(unixTimeStamp);

  return {
    year: dateValue.year(),
    month: dateValue.month() + 1,
    day: dateValue.date()
  };
}

export function getTimeFromUnixTimestamp(unixTimestamp) {
  const dateValue = moment.unix(unixTimestamp);

  return {
    hour: dateValue.hour(),
    minute: dateValue.minute(),
    second: dateValue.second()
  };
}

export function getCurrentDate() {
  const now = moment();
  return {
    year: now.year(),
    month: now.month() + 1,
    day: now.date()
  };
}

export function getCurrentUnixTimestamp() {
  return moment().unix();
}

export function getDateTimeStringFromUnixTimestamp(unixTimeStamp) {
  const date = getDateFromUnixTimestamp(unixTimeStamp);
  const time = getTimeFromUnixTimestamp(unixTimeStamp);

  return getCorrectString(date.day) + '/' + getCorrectString(date.month) + '/' + date.year + ' ' + getCorrectString(time.hour) + ':' + getCorrectString(time.minute) + ':' + getCorrectString(time.second);
}

function getCorrectString(value) {
  if (value.toString().length === 1) {
    return '0' + value;
  }
  return value;
}
