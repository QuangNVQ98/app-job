import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EventService} from '../../../../@core/service/event.service';
import {Subject, Subscription} from 'rxjs';
import {IComment} from '../../../../@core/interface/comment.interface';
import {ApiPostService} from '../../../../@core/api/api-post.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-post-comment-menu',
  templateUrl: './post-comment-menu.component.html',
  styleUrls: ['./post-comment-menu.component.scss']
})
export class PostCommentMenuComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  @Input() postId: string
  data: IComment[];
  currId: any;
  private _eventSubscription: Subscription;

  constructor(
    private _eventService: EventService,
    private _apiPostService: ApiPostService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this._apiPostService.getComment(this.postId).pipe(
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

  itemClicked(item) {
    if (!this.currId) {
      this.currId = item._id;
      this._eventService.postStatusEmitData(item);
    } else {
      if (this.currId != item._id) {
        this.currId = item._id;
        this._eventService.postStatusEmitData(item);
      }
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
