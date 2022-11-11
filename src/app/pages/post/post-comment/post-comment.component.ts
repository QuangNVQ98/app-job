import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {EventService} from '../../../@core/service/event.service';
import {FACEBOOK_DOMAIN, FACEBOOK_HOST} from '../../../@core/constants/app.constant';
import {IComment} from '../../../@core/interface/comment.interface';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccountFbInfoComponent} from '../../../@theme/components/account-fb-info/account-fb-info.component';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  private _eventSubscription: Subscription;
  currItem: IComment;

  fbHost = FACEBOOK_HOST;
  fbDomain = FACEBOOK_DOMAIN;

  constructor(
    private _eventService: EventService,
    private _modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this._eventSubscription = this._eventService.postStatusItem$.subscribe(data => {
      this.currItem = data;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();

    if (this._eventSubscription) {
      this._eventSubscription.unsubscribe();
    }
  }

  showAccount() {
    if (this.currItem.account_fb_id) {
      const modalRef = this._modalService.open(AccountFbInfoComponent, {size: 'sm', backdrop: 'static', centered: true});
      modalRef.componentInstance.id = this.currItem.account_fb_id;
    }
  }

}
