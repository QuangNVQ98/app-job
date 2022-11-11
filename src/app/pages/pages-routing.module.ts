import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CareerComponent} from './career/career.component';
import {GroupComponent} from './group/group.component';
import {ProfileComponent} from './profile/profile.component';
import {SettingComponent} from './setting/setting.component';
import {RoleGuardService} from '../@core/route-guard/role-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'campaign', pathMatch: 'full' },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'career',
        component: CareerComponent,
        canActivate: [RoleGuardService],
        data: {permission_code: 'career'}
      },
      {
        path: 'group',
        component: GroupComponent,
        canActivate: [RoleGuardService],
        data: {permission_code: 'group'}
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'setting',
        component: SettingComponent,
        canActivate: [RoleGuardService],
        data: {permission_code: 'setting'}
      },
      {
        path: 'account-fb',
        loadChildren: () =>
          import('./account-fb/account-fb.module').then((m) => m.AccountFbModule),
        canActivate: [RoleGuardService],
        data: {permission_code: 'account_fb'}
      },
      {
        path: 'post',
        loadChildren: () =>
          import('./post/post.module').then((m) => m.PostModule),
        canActivate: [RoleGuardService],
        data: {permission_code: 'post'}
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
        canActivate: [RoleGuardService],
        data: {permission_code: 'account'}
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      }
    ]
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
