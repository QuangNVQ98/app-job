import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesRoutingModule } from './pages-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CareerComponent } from './career/career.component';
import { CareerFormComponent } from './career/career-form/career-form.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { GroupComponent } from './group/group.component';
import { GroupFormComponent } from './group/group-form/group-form.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {ComponentsModule} from '../@theme/components/components.module';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import {ChartModule} from 'angular2-chartjs';
import {UiSwitchModule} from 'ngx-ui-switch';
import { GroupMemberComponent } from './group/group-member/group-member.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { SettingComponent } from './setting/setting.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationItemComponent } from './notification/notification-item/notification-item.component';
import {PipeModule} from '../@core/pipe/pipe.module';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    NotFoundComponent,
    CareerComponent,
    CareerFormComponent,
    GroupComponent,
    GroupFormComponent,
    ProfileComponent,
    ChangePasswordComponent,
    GroupMemberComponent,
    SettingComponent,
    NotificationComponent,
    NotificationItemComponent
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        FormsModule,
        SweetAlert2Module,
        ReactiveFormsModule,
        NgSelectModule,
        ComponentsModule,
        ChartModule,
        UiSwitchModule,
        PerfectScrollbarModule,
        PipeModule
    ],
  entryComponents: [
    CareerFormComponent,
    GroupFormComponent
  ]
})
export class PagesModule { }
