import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupFormComponent} from './group-form/group-form.component';
import {Subject} from 'rxjs';
import {ICareer} from '../../@core/interface/career.interface';
import {IGroup} from '../../@core/interface/group.interface';
import {takeUntil} from 'rxjs/operators';
import {ApiGroupService} from '../../@core/api/api-group.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IPagination} from '../../@core/interface/api.interface';
import {AddressService} from '../../@core/service/address.service';
import {
  ACCOUNT_FB_GROUP_STATUS_COMPLETE,
  FACEBOOK_DOMAIN,
  FACEBOOK_HOST,
  NO_DATA_MESSAGE,
  RECORD_PER_PAGE
} from '../../@core/constants/app.constant';
import {ILocation} from '../../@core/interface/location.interface';
import {ApiCareerService} from '../../@core/api/api-career.service';
import {showToast} from '../../@core/helper/common.helper';
import {ToastrService} from 'ngx-toastr';
import {GroupMemberComponent} from './group-member/group-member.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
  @ViewChild('modalConfirm') modalConfirm: SwalComponent;
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  idTemp: any;
  data: IGroup[];
  noDataMessage = NO_DATA_MESSAGE;

  fbHost = FACEBOOK_HOST;
  fbDomain = FACEBOOK_DOMAIN;

  formSearch: FormGroup;
  lstCareer: ICareer[];
  lstLocation: ILocation[];

  limit: number = RECORD_PER_PAGE;
  offset: number = 0;
  pagination: IPagination;

  constructor(
    private modalService: NgbModal,
    private apiGroupService: ApiGroupService,
    private _fb: FormBuilder,
    private _addressService: AddressService,
    private _apiCareerService: ApiCareerService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this._apiCareerService.getList().pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.lstCareer = data.data;
    });

    this.lstLocation = this._addressService.getProvinces();
    this.buildFormSearch();
    this.search();
  }

  buildFormSearch() {
    this.formSearch = this._fb.group({
      name: [''],
      career_id: [],
      location_id: []
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
      career_id: formValue.career_id ? formValue.career_id : '',
      location_id: (formValue.location_id || formValue.location_id == 0) ? formValue.location_id : '',
      limit: this.limit,
      offset: this.offset
    };

    this.apiGroupService.getList(params).pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.isLoading = false;
      if (data && data.status) {
        this.data = data.data.data;
        this.data = this.data.map(x => {
          return {...x, total_account_in_group: x.lstAccountFb ?  x.lstAccountFb.filter(x => x.status == ACCOUNT_FB_GROUP_STATUS_COMPLETE).length : null};
        })
        this.pagination = {
          total: data.data.total,
          limit: this.limit,
          offset: this.offset
        };
      }
    }, error => {
      this.isLoading = false;
    });
  }

  changeStatus(id) {
    this.isLoading = true;
    this.apiGroupService.changeStatus(id).pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.isLoading = false;
      if (data && data.status) {
        showToast(this._toastrService, null, 'Cập nhật trạng thái thành công');
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
    const modalRef = this.modalService.open(GroupFormComponent, { size: 'lg', backdrop: 'static' });
    if (id) {
      modalRef.componentInstance.id = id;
    }

    modalRef.result.then(data => {
      if (data) {
        this.search();
      }
    });
  }

  viewMember(id) {
    const modalRef = this.modalService.open(GroupMemberComponent, { size: 'lg', backdrop: 'static', centered: true });
    if (id) {
      modalRef.componentInstance.id = id;
    }
  }

  onDelete(id): void {
    this.idTemp = id;
    this.modalConfirm.fire();
  }

  confirm(): void {
    this.isLoading = true;
    this.apiGroupService.delete(this.idTemp).pipe(
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
