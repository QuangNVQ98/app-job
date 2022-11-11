import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AccountFbRoutingModule} from './account-fb-routing.module';
import {AccountFbComponent} from './account-fb.component';
import { AccountFbListComponent } from './account-fb-list/account-fb-list.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { AccountFbFormComponent } from './account-fb-form/account-fb-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccountFbPostComponent } from './account-fb-post/account-fb-post.component';
import {NgbDatepickerModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { PostDetailComponent } from './post-detail/post-detail.component';
import {ComponentsModule} from '../../@theme/components/components.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {PipeModule} from '../../@core/pipe/pipe.module';
import { AccountFbGroupComponent } from './account-fb-group/account-fb-group.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

@NgModule({
    imports: [
        CommonModule,
        AccountFbRoutingModule,
        FormsModule,
        SweetAlert2Module,
        ReactiveFormsModule,
        NgbDatepickerModule,
        ComponentsModule,
        NgSelectModule,
        PipeModule,
        NgbTooltipModule,
        PerfectScrollbarModule,
    ],
  declarations: [
    AccountFbComponent,
    AccountFbListComponent,
    AccountFbFormComponent,
    AccountFbPostComponent,
    PostDetailComponent,
    AccountFbGroupComponent
  ]
})
export class AccountFbModule { }
