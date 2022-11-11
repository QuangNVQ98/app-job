import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiPostService} from '../../../../@core/api/api-post.service';
import {
  FACEBOOK_DOMAIN,
  FACEBOOK_HOST, NO_DATA_MESSAGE,
  POST_GROUP_STATUS_COMPLETE,
  POST_GROUP_STATUS_WAITING
} from '../../../../@core/constants/app.constant';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-success-post',
  templateUrl: './success-post.component.html',
  styleUrls: ['./success-post.component.scss']
})
export class SuccessPostComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  @Input() postId: any;
  data: any;
  noDataMessage = NO_DATA_MESSAGE;
  fbHost = FACEBOOK_HOST;
  fbDomain = FACEBOOK_DOMAIN;

  constructor(
    private router: Router,
    private _apiPostService: ApiPostService
  ) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.isLoading = true;
    this._apiPostService.getGroupByStatus(this.postId, POST_GROUP_STATUS_COMPLETE).pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.isLoading = false;
      if (data && data.status) {
        this.data = data.data;
      }
    }, error => {
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
