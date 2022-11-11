import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Subject} from 'rxjs';
import {IAccount} from '../../../@core/interface/account.interface';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccountFormComponent} from '../account-form/account-form.component';
import {takeUntil} from 'rxjs/operators';
import {ApiAccountService} from '../../../@core/api/api-account.service';
import {AccountService} from '../../../@core/service/account.service';
import {NO_DATA_MESSAGE, ROLE_ADMIN} from '../../../@core/constants/app.constant';
import {showToast} from '../../../@core/helper/common.helper';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  @ViewChild('modalConfirm') modalConfirm: SwalComponent;
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  idTemp: any;
  data: IAccount[];
  noDataMessage = NO_DATA_MESSAGE;

  constructor(
    private modalService: NgbModal,
    private apiAccountService: ApiAccountService,
    private _accountService: AccountService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.isLoading = true;
    this.apiAccountService.getList().pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.data = data.data;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  openForm(id?): void {
    const modalRef = this.modalService.open(AccountFormComponent, { size: 'lg', backdrop: 'static', });
    if (id) {
      modalRef.componentInstance.id = id;
    }

    modalRef.result.then(data => {
      if (data) {
        this.search();
      }
    });
  }

  onDelete(id): void {
    this.idTemp = id;
    this.modalConfirm.fire();
  }

  confirm(): void {
    this.isLoading = true;
    this.apiAccountService.delete(this.idTemp).pipe(
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

  canDelete(_id) {
    return this._accountService.account && this._accountService.account.role == ROLE_ADMIN && (this._accountService.account._id != _id);
  }

  canEdit(_id, item) {
    return !(this._accountService.account && this._accountService.account.is_super != true && item.is_super == true);
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
