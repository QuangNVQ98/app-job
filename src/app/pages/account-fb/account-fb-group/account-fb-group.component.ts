import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {IGroup} from '../../../@core/interface/group.interface';
import {ApiAccountFbService} from '../../../@core/api/api-account-fb.service';
import {ACCOUNT_FB_GROUP_STATUS_COMPLETE, FACEBOOK_DOMAIN, FACEBOOK_HOST} from '../../../@core/constants/app.constant';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-account-fb-group',
  templateUrl: './account-fb-group.component.html',
  styleUrls: ['./account-fb-group.component.scss']
})
export class AccountFbGroupComponent implements OnInit {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  id: any;
  lstGroup: any[];
  fbHost = FACEBOOK_HOST;
  fbDomain = FACEBOOK_DOMAIN;

  accountFbGroupComplete = ACCOUNT_FB_GROUP_STATUS_COMPLETE;

  constructor(
    private activeModal: NgbActiveModal,
    private _apiAccountFbService: ApiAccountFbService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this._apiAccountFbService.getGroupByStatus(this.id).pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.isLoading = false;

      if (data && data.status) {
        this.lstGroup = data.data;
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
