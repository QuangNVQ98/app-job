import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiGroupService} from '../../../@core/api/api-group.service';
import {takeUntil} from 'rxjs/operators';
import {IAccountFb} from '../../../@core/interface/account-fb.interface';
import {ACCOUNT_FB_GROUP_STATUS_COMPLETE, FACEBOOK_DOMAIN, FACEBOOK_HOST} from '../../../@core/constants/app.constant';

@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.scss']
})
export class GroupMemberComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  id: any;
  lstAccountFb: any;
  fbHost = FACEBOOK_HOST;
  fbDomain = FACEBOOK_DOMAIN;

  constructor(
    private activeModal: NgbActiveModal,
    private apiGroupService: ApiGroupService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiGroupService.getMemberByStatus(this.id, ACCOUNT_FB_GROUP_STATUS_COMPLETE).pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.isLoading = false;
      if (data && data.status) {
        this.lstAccountFb = data.data;
      }
    }, error => {
      this.isLoading = false;
    });
  }

  onClose(): void {
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
