import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'getStringFromList'
})
export class GetStringFromListPipe implements PipeTransform {
  transform(value: any, type: string = 'first'): any {
    if (!value) return '';
    let str = '';

    if (value.length <= 2) {
      value.forEach((x, index) => {
        str += x.name;

        if (index === 0 && value.length > 1) {
          str += ', '
        }
      });

      return str;
    }

    if (type !== 'first') {
      for (let i = 2; i < value.length; i++) {
        str += value[i].name;
        if (value.length > 3 && i < value.length - 1) {
          str += ', ';
        }
      }

      return str;
    }

    return value[0].name + ', ' + value[1].name;
  }

}
