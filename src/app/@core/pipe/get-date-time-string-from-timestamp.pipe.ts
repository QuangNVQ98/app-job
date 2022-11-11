import {Pipe, PipeTransform} from '@angular/core';
import {getDateTimeStringFromUnixTimestamp} from '../helper/moment.helper';

@Pipe({
  name: 'getDateTimeString'
})
export class GetDateTimeStringFromTimestampPipe implements PipeTransform {
  transform(value: any): any {
    if (!value) {
      return '--';
    }
    return getDateTimeStringFromUnixTimestamp(value);
  }
}
