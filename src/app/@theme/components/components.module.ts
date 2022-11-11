import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './input/input.component';
import {SelectComponent} from './select/select.component';
import {PaginationComponent} from './pagination/pagination.component';
import {LoadingOverlayComponent} from './loading-overlay/loading-overlay.component';
import {DirectiveModule} from '../../@core/directive/directive.module';
import { AccountFbInfoComponent } from './account-fb-info/account-fb-info.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DirectiveModule
    ],
  exports: [
    InputComponent,
    SelectComponent,
    PaginationComponent,
    LoadingOverlayComponent
  ],
  declarations: [
    InputComponent,
    SelectComponent,
    PaginationComponent,
    LoadingOverlayComponent,
    AccountFbInfoComponent
  ]
})
export class ComponentsModule { }
