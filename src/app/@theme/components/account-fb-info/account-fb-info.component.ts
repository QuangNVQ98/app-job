import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FACEBOOK_DOMAIN, FACEBOOK_HOST} from '../../../@core/constants/app.constant';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiAccountFbService} from '../../../@core/api/api-account-fb.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-account-fb-info',
  templateUrl: './account-fb-info.component.html',
  styleUrls: ['./account-fb-info.component.scss']
})
export class AccountFbInfoComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  id: any;
  data: any;
  fbHost = FACEBOOK_HOST;
  fbDomain = FACEBOOK_DOMAIN;

  constructor(
    private activeModal: NgbActiveModal,
    private apiAccountFbService: ApiAccountFbService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiAccountFbService.getById(this.id).pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.isLoading = false;
      if (data && data.status) {
        this.data = data.data
      }
    }, error => {
      this.isLoading = false;
    })
  }

  onClose(): void {
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
