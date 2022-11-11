import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgbDatepickerModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {ComponentsModule} from '../../@theme/components/components.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgModule} from '@angular/core';
import {AccountComponent} from './account.component';
import {AccountRoutingModule} from './account-routing.module';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountListComponent } from './account-list/account-list.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    NgbDatepickerModule,
    ComponentsModule,
    NgSelectModule,
    NgbTooltipModule
  ],
  declarations: [
    AccountComponent,
    AccountFormComponent,
    AccountListComponent
  ]
})
export class AccountModule { }
