import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostComponent} from './post.component';
import {PostListComponent} from './post-list/post-list.component';
import {PostStatusComponent} from './post-status/post-status.component';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    children: [
      {
        path: '',
        component: PostListComponent
      },
      {
        path: 'post-status',
        component: PostStatusComponent
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
export class PostRoutingModule { }
