import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {IComment} from "../../../../@core/interface/comment.interface";
import {ActivatedRoute} from "@angular/router";
import {EventService} from '../../../../@core/service/event.service';
import {FormControl} from '@angular/forms';
import {PerfectScrollbarComponent} from 'ngx-perfect-scrollbar';
import {ApiPostService} from '../../../../@core/api/api-post.service';
import {COMMENT_STATUS_PROCESSING, COMMENT_STATUS_WAITING} from '../../../../@core/constants/app.constant';
import {takeUntil} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {showToast} from '../../../../@core/helper/common.helper';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.scss']
})
export class CommentDetailComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  private _eventSubscription: Subscription;
  currItem: any;

  @ViewChild(PerfectScrollbarComponent, { static: false }) componentRef?: PerfectScrollbarComponent;

  message = new FormControl('');

  @Input() data: IComment;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _eventService: EventService,
    private _apiPostService: ApiPostService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this._eventSubscription = this._eventService.postStatusItem$.subscribe(data => {
      this.currItem = data;
    });
  }

  send(type) {
    const msg = this.message.value;

    if (msg) {
      const copyData = JSON.parse(JSON.stringify(this.data));

      const obj = {
        comment_type: type,
        content: msg,
        post_fbid: copyData.post_fbid,
        post_id: copyData.post_id,
        group_id: copyData.group_id,
        group_fbid: copyData.group_fbid,
        status: COMMENT_STATUS_WAITING
      };

      this._apiPostService.sendComment(this.data._id, obj).pipe(
        takeUntil(this._unsubscribe$)
      ).subscribe(data => {
        if (data && data.status) {
          showToast(this._toastrService, null, 'Gửi thành công');
          if (!this.data.sub_comments) {
            this.data.sub_comments = [];
          }
          this.data.sub_comments.push(data.data);
          this.componentRef.directiveRef.scrollToBottom(-100, 100);
          this.message.setValue('');
        }
      });
    }
  }


  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();

    if (this._eventSubscription) {
      this._eventSubscription.unsubscribe();
    }
  }

}
