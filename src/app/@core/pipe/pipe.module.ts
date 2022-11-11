import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GetStringFromListPipe} from './get-string-from-list.pipe';
import {GetDateTimeStringFromTimestampPipe} from './get-date-time-string-from-timestamp.pipe';
import {GetRelativeTimeFromTimestampPipe} from './get-relative-time-from-timestamp.pipe';
import {SubStringPipe} from './sub-string.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GetStringFromListPipe,
    GetDateTimeStringFromTimestampPipe,
    GetRelativeTimeFromTimestampPipe,
    SubStringPipe
  ],
  exports: [
    GetStringFromListPipe,
    GetDateTimeStringFromTimestampPipe,
    GetRelativeTimeFromTimestampPipe,
    SubStringPipe
  ]
})
export class PipeModule { }
