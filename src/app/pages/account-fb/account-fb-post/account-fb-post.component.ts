import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostDetailComponent} from '../post-detail/post-detail.component';
import {IGroup} from '../../../@core/interface/group.interface';
import {ApiGroupService} from '../../../@core/api/api-group.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FACEBOOK_DOMAIN, FACEBOOK_HOST, NO_DATA_MESSAGE, RECORD_PER_PAGE} from '../../../@core/constants/app.constant';
import {IPagination} from '../../../@core/interface/api.interface';
import {ApiAccountFbService} from '../../../@core/api/api-account-fb.service';
import {getUnixTimeStamp} from '../../../@core/helper/moment.helper';
import {IAccountFb} from '../../../@core/interface/account-fb.interface';
import {AccountFbInfoComponent} from '../../../@theme/components/account-fb-info/account-fb-info.component';

@Component({
  selector: 'app-account-fb-post',
  templateUrl: './account-fb-post.component.html',
  styleUrls: ['./account-fb-post.component.scss']
})
export class AccountFbPostComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  account_fb_id: any;
  formSearch: FormGroup;
  lstGroup: IGroup[];

  fbHost = FACEBOOK_HOST;
  fbDomain = FACEBOOK_DOMAIN;

  limit: number = RECORD_PER_PAGE;
  offset: number = 0;
  pagination: IPagination;

  data: any;
  noDataMessage = NO_DATA_MESSAGE;
  accountFb: IAccountFb;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private _apiGroupService: ApiGroupService,
    private _apiAccountFbService: ApiAccountFbService,
    private _modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.account_fb_id = this.activatedRoute.snapshot.queryParamMap.get('fbId');
    this._apiGroupService.searchGroup().pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      if (data && data.status) {
        this.lstGroup = data.data;
      }
    });
    this._apiAccountFbService.getById(this.account_fb_id).pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      if (data && data.status) {
        this.accountFb = data.data;
      }
    });

    this.buildForm();
    this.search();
  }

  buildForm(): void {
    this.formSearch = this.fb.group({
      title: [''],
      group_id: [''],
      post_date: ['']
    });
  }

  search(): void {
    this.isLoading = true;
    const formValue = this.formSearch.value;

    const params = {
      title: formValue.title,
      group_id: formValue.group_id,
      post_date: formValue.post_date ? getUnixTimeStamp(formValue.post_date) : '',
      limit: this.limit,
      offset: this.offset
    };

    this._apiAccountFbService.getListPost(this.account_fb_id, params).pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.isLoading = false;

      if (data && data.status) {
        this.pagination = {
          total: data.data.total,
          limit: this.limit,
          offset: this.offset
        };
        this.data = data.data.data;
      }
    }, error => {
      this.isLoading = false;
    });
  }

  changePage(type) {
    if (type === 'next') {
      this.offset += 1;

      this.search();
    } else {
      this.offset -= 1;

      this.search();
    }
  }

  viewPost(id): void {
    const modalRef = this.modalService.open(PostDetailComponent, {size: 'xl', backdrop: 'static'});
    modalRef.componentInstance.id = id;
  }

  showAccount() {
    if (this.account_fb_id) {
      const modalRef = this._modalService.open(AccountFbInfoComponent, {size: 'sm', backdrop: 'static', centered: true});
      modalRef.componentInstance.id = this.account_fb_id;
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
