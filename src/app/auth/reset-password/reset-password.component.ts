import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MustMatch} from '../../@core/validator/must-match.validator';
import {Subject} from 'rxjs';
import {ApiAuthService} from '../../@core/api/api-auth.service';
import {takeUntil} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {showToast} from '../../@core/helper/common.helper';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading: boolean = false;
  email: string;
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _apiAuthService: ApiAuthService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.queryParamMap.get('email');
    this.buildForm();
    showToast(this._toastrService, null, 'Mã đã được gửi về email');
  }

  buildForm() {
    this.form = this.fb.group({
      email: [{value: this.email, disabled: true}],
      code: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirm_password')
    });
  }

  validateForm() {
    Object.keys(this.form.controls).forEach(control => {
      this.form.get(control).markAsTouched();
    });
  }

  onSubmit() {
    this.validateForm();

    if (this.form.valid) {
      const body = this.form.getRawValue();

      this.isLoading = true;
      this._apiAuthService.resetPassword(body).pipe(
        takeUntil(this._unsubscribe$)
      ).subscribe(data => {
        this.isLoading = false;

        if (data && data.status) {
          showToast(this._toastrService, null, 'Reset mật khẩu thành công');

          this.form.reset();
          this.router.navigate(['/auth']);
        }
      }, error => {
        this.isLoading = false;
      })
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
