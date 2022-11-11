import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiSettingService} from '../../@core/api/api-setting.service';
import {ToastrService} from 'ngx-toastr';
import {takeUntil} from 'rxjs/operators';
import {showToast} from '../../@core/helper/common.helper';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _apiSettingService: ApiSettingService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this._apiSettingService.getSetting().pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      if (data && data.status) {
        this.buildForm(data.data);
      }
    });
  }

  buildForm(obj?) {
    this.form = this._fb.group({
      account_fb: this.initAccountFbForm(obj ? obj.account_fb : null),
      status: this.initStatusForm(obj ? obj.status : null)
    })
  }

  initAccountFbForm(obj?) {
    return this._fb.group({
      time_between_session: [obj ? obj.time_between_session : '', Validators.required],
      post_max_per_session: [obj ? obj.post_max_per_session : '', Validators.required],
      join_max_per_session: [obj ? obj.join_max_per_session : '', Validators.required],
      post_max_per_group_in_time_range: this._fb.group({
        post_num: [obj ? obj.post_max_per_group_in_time_range.post_num : '', Validators.required],
        time_range: [obj ? obj.post_max_per_group_in_time_range.time_range : '', Validators.required]
      }),
      post_max_per_time_range: this._fb.group({
        post_num: [obj ? obj.post_max_per_time_range.post_num : '', Validators.required],
        time_range: [obj ? obj.post_max_per_time_range.time_range : '', Validators.required]
      })
    });
  }

  initStatusForm(obj?) {
    return this._fb.group({
      time_check_join: [obj ? obj.time_check_join : '', Validators.required],
      time_check_post: [obj ? obj.time_check_post : '', Validators.required]
    })
  }

  validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormGroup) {
        this.validateForm(control);
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  onSubmit() {
    this.validateForm(this.form);

    if (this.form.valid) {
      this.parseIntValue(this.form.value);

      this.isLoading = true;
      this._apiSettingService.save(this.form.value).subscribe(data => {
        this.isLoading = false;

        if (data && data.status) {
          showToast(this._toastrService, null, 'Lưu thành công')
        }
      }, error => {
        this.isLoading = false;
      });
    }
  }

  parseIntValue(obj) {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] == 'object') {
        this.parseIntValue(obj[key]);
      } else {
        obj[key] = parseInt(obj[key]);
      }
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
