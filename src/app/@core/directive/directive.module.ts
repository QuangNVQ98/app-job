import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlTrimReactiveFormDirective} from './control-trim-reactive-form.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ControlTrimReactiveFormDirective
  ],
  exports: [
    ControlTrimReactiveFormDirective
  ]
})
export class DirectiveModule { }
