import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccountFbFormComponent} from '../account-fb-form/account-fb-form.component';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {IAccountFb} from '../../../@core/interface/account-fb.interface';
import {ApiAccountFbService} from '../../../@core/api/api-account-fb.service';
import {takeUntil} from 'rxjs/operators';
import {ICareer} from '../../../@core/interface/career.interface';
import {
  ACCOUNT_FB_GROUP_STATUS_COMPLETE,
  FACEBOOK_DOMAIN,
  FACEBOOK_HOST,
  NO_DATA_MESSAGE,
  RECORD_PER_PAGE
} from '../../../@core/constants/app.constant';
import {IPagination} from '../../../@core/interface/api.interface';
import {ApiCareerService} from '../../../@core/api/api-career.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountFbGroupComponent} from '../account-fb-group/account-fb-group.component';
import {showToast} from '../../../@core/helper/common.helper';

@Component({
  selector: 'app-account-fb-list',
  templateUrl: './account-fb-list.component.html',
  styleUrls: ['./account-fb-list.component.scss']
})
export class AccountFbListComponent implements OnInit, OnDestroy {
  @ViewChild('modalConfirm') modalConfirm: SwalComponent;
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  idTemp: any;
  data: IAccountFb[];
  noDataMessage = NO_DATA_MESSAGE;
  fbHost = FACEBOOK_HOST;
  fbDomain = FACEBOOK_DOMAIN;

  formSearch: FormGroup;
  lstCareer: ICareer[];

  limit: number = RECORD_PER_PAGE;
  offset: number = 0;
  pagination: IPagination;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private _fb: FormBuilder,
    private accountFbService: ApiAccountFbService,
    private _apiCareerService: ApiCareerService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this._apiCareerService.getList().pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.lstCareer = data.data;
    });

    this.buildFormSearch();
    this.search();
  }

  buildFormSearch() {
    this.formSearch = this._fb.group({
      careers: [],
      name: [''],
      status: ['']
    });
  }

  onSearch() {
    this.offset = 0;
    this.limit = 10;

    this.search();
  }

  search(): void {
    this.isLoading = true;
    const formValue = this.formSearch.value;

    const params = {
      name: formValue.name,
      careers: formValue.careers ? formValue.careers : '',
      status: formValue.status,
      limit: this.limit,
      offset: this.offset
    };

    this.accountFbService.getList(params).pipe(
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
        this.data = this.data.map(x => {
          return {...x, totalGroupJoin: x.lstGroup ?  x.lstGroup.filter(x => x.status == ACCOUNT_FB_GROUP_STATUS_COMPLETE).length : null};
        });
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

  openForm(id?): void {
    const modalRef = this.modalService.open(AccountFbFormComponent, { size: 'xl', backdrop: 'static', });
    if (id) {
      modalRef.componentInstance.id = id;
    }

    modalRef.result.then(data => {
      if (data) {
        this.search();
      }
    });
  }

  viewGroup(id) {
    const modalRef = this.modalService.open(AccountFbGroupComponent, { size: 'lg', backdrop: 'static', centered: true });
    if (id) {
      modalRef.componentInstance.id = id;
    }
  }

  viewPost(id): void {
    this.router.navigate(['/pages/account-fb/post'], {queryParams: {fbId: id}});
  }

  onDelete(id): void {
    this.idTemp = id;
    this.modalConfirm.fire();
  }

  confirm(): void {
    this.isLoading = true;
    this.accountFbService.delete(this.idTemp).pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.isLoading = false;
      if (data && data.status) {
        showToast(this._toastrService, null, 'Xóa thành công');
        this.search();
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
