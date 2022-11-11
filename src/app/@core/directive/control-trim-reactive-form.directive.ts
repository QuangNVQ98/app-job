import {Directive, HostListener, Input} from '@angular/core';
import {NgControl} from '@angular/forms';
import {isDefined} from '../helper/common.helper';

@Directive({
  selector: '[appControlTrimReactiveForm]',
})

export class ControlTrimReactiveFormDirective {
  private deepRegex = /[ \f\r\t\v\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+/g;
  constructor(private control: NgControl) {
  }

  @Input() ControlTrim?: 'left' | 'right' | 'deep' | 'both';
  @HostListener('blur', ['$event']) onBlur(event: FocusEvent) {

    const e = <FocusEvent>event;
    let value = (<any>e.target).value || '';
    if (isDefined(value)) {
      switch (this.ControlTrim) {
        case 'both':
          value = (value as string).trim();
          break;
        case 'deep':
          value = value.replace(this.deepRegex, ' ');
          break;
      }
    }
    this.control.control.setValue(value);
  }

}
