import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {MustMatch} from '../../../@core/validator/must-match.validator';
import {AccountService} from '../../../@core/service/account.service';
import {ApiAccountService} from '../../../@core/api/api-account.service';
import {IAccount} from '../../../@core/interface/account.interface';
import {takeUntil} from 'rxjs/operators';
import {showToast} from '../../../@core/helper/common.helper';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  form: FormGroup;
  account: IAccount;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private _accountService: AccountService,
    private _apiAccountService: ApiAccountService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.account = this._accountService.account;
  }

  buildForm() {
    this.form = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    },{
      validator: MustMatch('new_password', 'confirm_password')
    });
  }

  validateForm(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  onSubmit() {
    this.validateForm();

    if (this.form.valid) {
      const formValue = this.form.value;
      const body = {...formValue, id: this.account._id};

      this.isLoading = true;
      this._apiAccountService.changePassword(body).pipe(
        takeUntil(this._unsubscribe$)
      ).subscribe(data => {
        this.isLoading = false;

        if (data && data.status) {
          showToast(this.toastrService, null, 'Đổi mật khẩu thành công');
          this.activeModal.close();
        }
      }, error => {
        this.isLoading = false;
      })
    }
  }

  onClose() {
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
