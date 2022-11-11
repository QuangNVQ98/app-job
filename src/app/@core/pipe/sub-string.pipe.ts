import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'subString'
})
export class SubStringPipe implements PipeTransform {
  transform(value: any, length: number = 40): any {
    if (value.length <= length) {
      return value
    } else {
      return value.substring(0, length - 1) + '...';
    }
  }
}
