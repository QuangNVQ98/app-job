import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiPostService} from '../../../@core/api/api-post.service';
import {IPost} from '../../../@core/interface/post.interface';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {POST_GROUP_STATUS_COMPLETE, POST_GROUP_STATUS_PROCESSING, POST_GROUP_STATUS_WAITING} from '../../../@core/constants/app.constant';

@Component({
  selector: 'app-post-status',
  templateUrl: './post-status.component.html',
  styleUrls: ['./post-status.component.scss']
})
export class PostStatusComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  postId: any;
  postStatus: any;
  data: IPost;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _apiPostService: ApiPostService
  ) { }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.queryParamMap.get('postId');
    this.isLoading = true;
    this._apiPostService.getById(this.postId).pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.isLoading = false;
      if (data && data.status) {
        this.data = data.data;
        this.data.group_success = this.data.groups.filter(x => x.status == POST_GROUP_STATUS_COMPLETE).length;
        this.data.group_waiting = this.data.groups.filter(x => x.status == POST_GROUP_STATUS_PROCESSING).length;
        this.data.group_pending = this.data.groups.filter(x => x.status == POST_GROUP_STATUS_WAITING).length;
      }
    }, error => {
      this.isLoading = false;
    })
  }

  viewList(type) {
    this.postStatus = type;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
