import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgbDatepickerModule, NgbNavModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {ComponentsModule} from '../../@theme/components/components.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {PostComponent} from './post.component';
import {PostRoutingModule} from './post-routing.module';
import {PostListComponent} from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import {CKEditorModule} from 'ckeditor4-angular';
import { PostStatusComponent } from './post-status/post-status.component';
import { SuccessPostComponent } from './post-status/success-post/success-post.component';
import { WaitingPostComponent } from './post-status/waiting-post/waiting-post.component';
import { PendingPostComponent } from './post-status/pending-post/pending-post.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { PostInboxComponent } from './post-inbox/post-inbox.component';
import { CommentItemComponent } from './post-comment/comment-item/comment-item.component';
import { QuickInboxComponent } from './post-comment/comment-item/quick-inbox/quick-inbox.component';
import {DirectiveModule} from '../../@core/directive/directive.module';
import {PipeModule} from '../../@core/pipe/pipe.module';
import { PostCommentMenuComponent } from './post-comment/post-comment-menu/post-comment-menu.component';
import { PostCommentMenuItemComponent } from './post-comment/post-comment-menu/post-comment-menu-item/post-comment-menu-item.component';
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import { CommentDetailComponent } from './post-comment/comment-detail/comment-detail.component';
import { InboxDetailComponent } from './post-comment/inbox-detail/inbox-detail.component';
import { InboxItemComponent } from './post-comment/inbox-detail/inbox-item/inbox-item.component';

@NgModule({
    imports: [
        CommonModule,
        PostRoutingModule,
        FormsModule,
        SweetAlert2Module,
        ReactiveFormsModule,
        NgbDatepickerModule,
        ComponentsModule,
        NgSelectModule,
        CKEditorModule,
        NgbNavModule,
        NgbTimepickerModule,
        DirectiveModule,
        PipeModule,
        PerfectScrollbarModule,
    ],
  declarations: [
    PostComponent,
    PostListComponent,
    PostFormComponent,
    PostStatusComponent,
    SuccessPostComponent,
    WaitingPostComponent,
    PendingPostComponent,
    PostCommentComponent,
    PostInboxComponent,
    CommentItemComponent,
    QuickInboxComponent,
    PostCommentMenuComponent,
    PostCommentMenuItemComponent,
    CommentDetailComponent,
    InboxDetailComponent,
    InboxItemComponent
  ]
})
export class PostModule { }
