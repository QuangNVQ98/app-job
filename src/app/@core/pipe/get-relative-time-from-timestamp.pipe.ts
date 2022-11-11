import {Pipe, PipeTransform} from '@angular/core';
import {getDateTimeStringFromUnixTimestamp} from '../helper/moment.helper';
import * as moment from 'moment';

@Pipe({
  name: 'getRelativeTime'
})
export class GetRelativeTimeFromTimestampPipe implements PipeTransform {
  transform(value: any): any {
    const now = moment().unix();

    if (now - value < 3600 * 6) { // nhỏ hơn 6 tiếng
      return moment().fromNow();
    } else {
      return getDateTimeStringFromUnixTimestamp(value);
    }
  }
}
