import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {takeUntil} from 'rxjs/operators';
import {showToast} from '../../../@core/helper/common.helper';
import {ApiAccountService} from '../../../@core/api/api-account.service';
import {MustMatch} from '../../../@core/validator/must-match.validator';
import {ARRAY_PERMISSION, ARRAY_ROLE} from '../../../@core/constants/app.constant';
import {AccountService} from '../../../@core/service/account.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  id: any;
  form: FormGroup;
  lstPermission = ARRAY_PERMISSION;
  lstRole = ARRAY_ROLE;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private apiAccountService: ApiAccountService,
    private _accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    if (this.id) {
      this.buildFormEdit();

      if (this._accountService.account && this._accountService.account._id == this.id) {
        this.form.get('role').disable({onlySelf: true});
      }
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      full_name: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      role: ['', Validators.required],
      acl: ['']
    }, {
      validator: MustMatch('password', 'confirm_password')
    });
  }

  changeRole() {
    const role = this.form.get('role').value;

    if (role == 2) {
      this.form.get('acl').setValidators([Validators.required]);
      this.form.get('acl').updateValueAndValidity({onlySelf: true});
    } else {
      this.form.get('acl').clearValidators();
      this.form.get('acl').updateValueAndValidity({onlySelf: true});
    }
  }

  buildFormEdit() {
    this.form = this.fb.group({
      full_name: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      acl: ['']
    });

    this.isLoading = true;

    this.apiAccountService.getById(this.id).pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.isLoading = false;

      if (data && data.status) {
        this.form.patchValue(data.data);
        this.changeRole();
      }
    }, error => {
      this.isLoading = false;
    });
  }

  checkValid(control, typeError): boolean {
    return this.form.get(control).hasError(typeError) && (this.form.get(control).touched || this.form.get(control).dirty);
  }

  checkControlValid(control): boolean {
    return this.form.get(control).invalid && (this.form.get(control).touched || this.form.get(control).dirty);
  }

  validateForm(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  onSubmit(): void {
    this.validateForm();

    if (this.form.valid) {
      const body = this.form.value;
      if (this.id) {
        body.id = this.id;
      }

      this.isLoading = true;
      this.apiAccountService.save(body).pipe(
        takeUntil(this._unsubscribe$)
      ).subscribe(data => {
        this.isLoading = false;

        if (data && data.error_code === 204 ) {
          this.form.get('email').setErrors({notUnique: true});
        }

        if (data && data.status) {
          showToast(this.toastrService, null, 'Lưu thành công');
          this.activeModal.close('ok');
        }
      }, error => {
        this.isLoading = false;
      });
    }
  }

  onClose(): void {
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
