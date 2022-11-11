import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiPostService} from '../../../../@core/api/api-post.service';
import {FACEBOOK_DOMAIN, NO_DATA_MESSAGE, POST_GROUP_STATUS_WAITING} from '../../../../@core/constants/app.constant';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-pending-post',
  templateUrl: './pending-post.component.html',
  styleUrls: ['./pending-post.component.scss']
})
export class PendingPostComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  @Input() postId: any;
  data: any;
  noDataMessage = NO_DATA_MESSAGE;

  constructor(
    private router: Router,
    private _apiPostService: ApiPostService
  ) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.isLoading = true;
    this._apiPostService.getGroupByStatus(this.postId, POST_GROUP_STATUS_WAITING).pipe(
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
