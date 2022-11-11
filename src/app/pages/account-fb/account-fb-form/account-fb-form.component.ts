import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ICareer} from '../../../@core/interface/career.interface';
import {ApiCareerService} from '../../../@core/api/api-career.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ApiAccountFbService} from '../../../@core/api/api-account-fb.service';
import {showToast} from '../../../@core/helper/common.helper';
import {ToastrService} from 'ngx-toastr';
import {ApiGroupService} from '../../../@core/api/api-group.service';
import {IGroup} from '../../../@core/interface/group.interface';
import {ApiSettingService} from '../../../@core/api/api-setting.service';

@Component({
  selector: 'app-account-fb-form',
  templateUrl: './account-fb-form.component.html',
  styleUrls: ['./account-fb-form.component.scss']
})
export class AccountFbFormComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  id: any;
  form: FormGroup;
  lstCareer: ICareer[];
  lstGroup: IGroup[][] = [];
  lstGroupToPost: IGroup[][] = [];

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiCareerService: ApiCareerService,
    private apiAccountFbService: ApiAccountFbService,
    private toastrService: ToastrService,
    private _apiGroupService: ApiGroupService,
    private _apiSettingService: ApiSettingService
  ) { }

  ngOnInit(): void {
    this.apiCareerService.getList().pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.lstCareer = data.data;
    });

    this.buildForm();

    this._apiSettingService.getSetting().pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      if (data && data.status) {
        this.form.get('setting').patchValue(data.data.account_fb);
      }
    });

    if (this.id) {
      this.isLoading = true;

      this.apiAccountFbService.getById(this.id).pipe(
        takeUntil(this._unsubscribe$)
      ).subscribe(data => {
        this.isLoading = false;

        if (data && data.status) {
          this.form.patchValue(data.data);

          const arrGroup = []
          data.data.careers.forEach(x => {
            const obj = {
              career_id: x,
              groups_auto_join: data.data.groups.filter(g => g.career_id == x).map(g => g.group_id),
              groups_auto_post: data.data.groups.filter(g => g.career_id == x && g.can_post == true).map(g => g.group_id)
            };

            arrGroup.push(obj);
          });
          this.groups.removeAt(0);
          arrGroup.forEach(x => {
            this.groups.push(this.initGroup(x));
          });
          this.groups['controls'].forEach((control, index) => {
            this.changeCareer(control, index);
          });
        }

        this.form.get('setting').patchValue(data.data.setting);
      }, error => {
        this.isLoading = false;
      });
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      full_name: ['', Validators.required],
      fbid: ['', Validators.required],
      password: ['', Validators.required],
      fa: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      email_password: ['', Validators.required],
      ranking: [''],
      status: ['', Validators.required],
      groups: this.fb.array([
        this.initGroup()
      ]),
      setting: this.initAccountFbForm()
    });
  }

  initAccountFbForm(obj?) {
    return this.fb.group({
      time_between_session: [obj ? obj.time_between_session : '', Validators.required],
      post_max_per_session: [obj ? obj.post_max_per_session : '', Validators.required],
      join_max_per_session: [obj ? obj.join_max_per_session : '', Validators.required],
      post_max_per_group_in_time_range: this.fb.group({
        post_num: [obj ? obj.post_max_per_group_in_time_range.post_num : '', Validators.required],
        time_range: [obj ? obj.post_max_per_group_in_time_range.time_range : '', Validators.required]
      }),
      post_max_per_time_range: this.fb.group({
        post_num: [obj ? obj.post_max_per_time_range.post_num : '', Validators.required],
        time_range: [obj ? obj.post_max_per_time_range.time_range : '', Validators.required]
      })
    });
  }

  initGroup(obj?) {
    return this.fb.group({
      career_id: [obj ? obj.career_id : null, Validators.required],
      groups_auto_join: [obj ? obj.groups_auto_join : null, Validators.required],
      groups_auto_post: [obj ? obj.groups_auto_post : null],
    });
  }

  get groups() {
    return this.form.get('groups') as FormArray;
  }

  removeGroup(index) {
    if (this.groups['controls'].length > 1) {
      this.groups.removeAt(index);

      if (this.lstGroup[index]) {
        this.lstGroup.splice(index, 1);
      }

      if (this.lstGroupToPost[index]) {
        this.lstGroupToPost.splice(index, 1);
      }
    }
  }

  addGroup() {
    this.groups.push(this.initGroup());
  }

  changeCareer(control, index) {
    const careerId = control.get('career_id').value;
    if (careerId) {
      this._apiGroupService.getListByCareer({careerId}).subscribe(data => {
        this.lstGroup[index] = data.data;

        this.checkValueGroupAutoJoin(control, index);
      });
    } else {
      this.lstGroup[index] = [];
      this.checkValueGroupAutoJoin(control, index);
    }
  }

  checkValueGroupAutoJoin(control, index) {
    let ids = control.get('groups_auto_join').value;
    if (ids && this.lstGroup[index]) {
      const lstGroupId = this.lstGroup[index].map(x => x._id);
      ids = ids.filter(x => lstGroupId.includes(x));
      control.get('groups_auto_join').setValue(ids);
      this.changeGroupAutoJoin(control, index);
    }
  }

  changeGroupAutoJoin(control, index) {
    const ids = control.get('groups_auto_join').value;
    this.lstGroupToPost[index] = this.lstGroup[index].filter(x => ids.includes(x._id));
    this.checkValueGroupAutoPost(control, index);
  }

  checkValueGroupAutoPost(control, index) {
    let idsJoin = control.get('groups_auto_join').value;
    let idsPost = control.get('groups_auto_post').value;
    if (idsPost && idsPost) {
      idsPost = idsPost.filter(x => idsJoin.includes(x));
      control.get('groups_auto_post').setValue(idsPost);
    }
  }

  checkValid(control, typeError, sub?): boolean {
    if (sub) {
      return sub.get(control).hasError(typeError) && (sub.get(control).touched || sub.get(control).dirty);
    } else {
      return this.form.get(control).hasError(typeError) && (this.form.get(control).touched || this.form.get(control).dirty);
    }
  }

  checkControlValid(control, sub?): boolean {
    if (sub) {
      return sub.get(control).invalid && (sub.get(control).touched || sub.get(control).dirty);
    } else {
      return this.form.get(control).invalid && (this.form.get(control).touched || this.form.get(control).dirty);
    }
  }

  validateForm(form: FormGroup): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormArray) {
        control['controls'].forEach(sub => {
          if (sub instanceof FormGroup) {
            this.validateForm(sub);
          }
        });
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  onSubmit(): void {
    this.validateForm(this.form);

    if (this.form.valid) {
      const body = this.form.value;
      const arrGroup = [];
      const arrCareer = [];
      body.groups.forEach(x => {
        x.groups_auto_join.forEach(g => {
          const obj = {
            career_id: x.career_id,
            group_id: g,
            can_post: false
          };
          if (x.groups_auto_post.includes(g)) {
            obj.can_post = true;
          }

          arrGroup.push(obj);
        });
        if (!arrCareer.includes(x.career_id)) {
          arrCareer.push(x.career_id);
        }
      });

      if (this.id) {
        body.id = this.id;
      }

      body.arrGroup = arrGroup;
      body.careers = arrCareer;

      this.isLoading = true;
      this.apiAccountFbService.save(body).pipe(
        takeUntil(this._unsubscribe$)
      ).subscribe(data => {
        this.isLoading = false;

        if (data && data.error_code === 204 ) {
          this.form.get('fbid').setErrors({notUnique: true});
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
