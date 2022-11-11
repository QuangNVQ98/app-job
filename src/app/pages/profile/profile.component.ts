import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ARRAY_TYPE_IMAGE} from '../../@core/constants/app.constant';
import {checkFileValid, showToast} from '../../@core/helper/common.helper';
import {AccountService} from '../../@core/service/account.service';
import {IAccount} from '../../@core/interface/account.interface';
import {ApiAccountService} from '../../@core/api/api-account.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  form: FormGroup;
  selectedFile: File;
  urlTemp: any;
  urlAvatar = '/assets/images/img-avatar.jpg';

  account: IAccount;

  constructor(
    private fb: FormBuilder,
    private _accountService: AccountService,
    private _apiAccountService: ApiAccountService,
    private _toastrService: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    if (this._accountService.account) {
      this.account = this._accountService.account;
      this.form.patchValue(this.account);
    } else {
      setTimeout(() => {
        this.account = this._accountService.account;
        this.form.patchValue(this.account);
      }, 500)
    }
  }

  buildForm() {
    this.form = this.fb.group({
      full_name: ['', Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      phone: ['']
    })
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (checkFileValid(file, ARRAY_TYPE_IMAGE)) {
        this.selectedFile = file;

        let reader = new FileReader();
        reader.onload = (event:any) => {
          this.urlTemp = event.target.result;
        }
        reader.readAsDataURL(file);
      }
    }
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
      const formData = new FormData();

      if (this.selectedFile) {
        formData.append('imagesFile', this.selectedFile, this.selectedFile.name)
      }
      formData.append('id', this.account._id);
      formData.append('full_name', formValue.full_name);
      formData.append('email', formValue.email);
      formData.append('phone', formValue.phone);

      this.isLoading = true;
      this._apiAccountService.updateProfile(formData).pipe(
        takeUntil(this._unsubscribe$)
      ).subscribe(data => {
        this.isLoading = false

        if (data && data.status) {
          showToast(this._toastrService, null, 'Lưu thành công');
        }
      }, error => {
        this.isLoading = false;
      })
    }
  }

  changePassword() {
    const modalRef = this.modalService.open(ChangePasswordComponent, {size: 'lg', backdrop: 'static'});
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
