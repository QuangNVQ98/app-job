import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AccountFbComponent} from './account-fb.component';
import {NgModule} from '@angular/core';
import {AccountFbListComponent} from './account-fb-list/account-fb-list.component';
import {AccountFbPostComponent} from './account-fb-post/account-fb-post.component';

const routes: Routes = [
  {
    path: '',
    component: AccountFbComponent,
    children: [
      {
        path: '',
        component: AccountFbListComponent
      },
      {
        path: 'post',
        component: AccountFbPostComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AccountFbRoutingModule { }
