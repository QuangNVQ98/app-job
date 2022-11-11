import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {ICareer} from '../../../@core/interface/career.interface';
import {ApiCareerService} from '../../../@core/api/api-career.service';
import {takeUntil} from 'rxjs/operators';
import {ApiGroupService} from '../../../@core/api/api-group.service';
import {ILocation} from '../../../@core/interface/location.interface';
import {IGroup} from '../../../@core/interface/group.interface';
import {ApiPostService} from '../../../@core/api/api-post.service';
import {AddressService} from '../../../@core/service/address.service';
import {ARRAY_TYPE_IMAGE} from '../../../@core/constants/app.constant';
import {
  checkFileValid,
  showToast
} from '../../../@core/helper/common.helper';
import {ToastrService} from 'ngx-toastr';
import {
  getCurrentDate,
  getDateFromUnixTimestamp,
  getTimeFromUnixTimestamp,
  getUnixTimeStamp
} from '../../../@core/helper/moment.helper';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  id: any;
  form: FormGroup;
  lstCareer: ICareer[];
  lstLocation: ILocation[];
  lstGroup: IGroup[];

  selectedFiles: File[] = [];
  urls = [];
  minDate: any;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiCareerService: ApiCareerService,
    private apiGroupService: ApiGroupService,
    private apiPostService: ApiPostService,
    private addressService: AddressService,
    private timePickerConfig: NgbTimepickerConfig,
    private toastrService: ToastrService,
  ) {
    timePickerConfig.seconds = false;
    timePickerConfig.spinners = false;
  }

  ngOnInit(): void {
    this.minDate = getCurrentDate();
    this.apiCareerService.getList().pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.lstCareer = data.data;
    });

    this.lstLocation = this.addressService.getProvinces();

    this.buildForm();
    if (this.id) {
      this.isLoading = true;

      this.apiPostService.getById(this.id).pipe(
        takeUntil(this._unsubscribe$)
      ).subscribe(data => {
        this.isLoading = false;

        if (data && data.status && data.data) {
          this.patchFormValue(data.data);
        }
      }, error => {
        this.isLoading = false;
      });
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      content: ['', Validators.required],
      title: ['', Validators.required],
      images: [''],
      career_id: [null, Validators.required],
      location_id: [null, Validators.required],
      groups: [null, Validators.required],
      post_type: ['', Validators.required],
      post_date: [''],
      post_time: ['']
    });
  }

  patchFormValue(obj) {
    this.form.patchValue(obj);

    this.getGroupData();
    if (obj.send_at === 0) {
      this.form.get('post_type').setValue('postNow');
    } else {
      this.form.get('post_type').setValue('postLate');

      this.form.get('post_date').setValue(getDateFromUnixTimestamp(obj.send_at));
      this.form.get('post_time').setValue(getTimeFromUnixTimestamp(obj.send_at));
    }

    this.changePostType();

    const arrGroupId = obj.groups.map(x => x.group_id);
    this.form.get('groups').setValue(arrGroupId);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {

      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        // chi lay file anh
        if (checkFileValid(event.target.files[i], ARRAY_TYPE_IMAGE)) {
          this.selectedFiles.push(event.target.files[i]);
          let reader = new FileReader();

          reader.onload = (event:any) => {
            this.urls.push(event.target.result);
          };

          reader.readAsDataURL(event.target.files[i]);
        } else {
          event.preventDefault();
        }
      }
    }
  }

  removeImage(index) {
    this.urls.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  removeImageEdit(index) {
    const images = this.form.get('images').value;

    images.splice(index, 1);
    this.form.get('images').setValue(images);
  }

  changeCareer(): void {
    this.getGroupData();
  }

  changeLocation(): void {
    this.getGroupData();
  }

  getGroupData(): void {
    this.lstGroup = [];
    this.form.get('groups').setValue('');

    const careerId = this.form.get('career_id').value;
    const locationId = this.form.get('location_id').value;

    if (careerId && (locationId || locationId == 0)) {
      const params = {careerId, locationId};
      this.apiGroupService.searchGroup(params).subscribe(data => {
        this.lstGroup = data.data;
      });
    }
  }

  changePostType() {
    const postType = this.form.get('post_type').value;

    if (postType === 'postLate') {
      this.form.get('post_date').setValidators([Validators.required]);
      this.form.get('post_date').updateValueAndValidity({onlySelf: true});
      this.form.get('post_time').setValidators([Validators.required]);
      this.form.get('post_time').updateValueAndValidity({onlySelf: true});
    } else {
      this.form.get('post_date').clearValidators();
      this.form.get('post_date').updateValueAndValidity({onlySelf: true});
      this.form.get('post_time').clearValidators();
      this.form.get('post_time').updateValueAndValidity({onlySelf: true});
    }
  }

  onSubmit(): void {
    this.validateForm();

    if (this.form.valid) {
      const formValue = this.form.value;
      const formData = new FormData();
      if (this.selectedFiles && this.selectedFiles.length > 0) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('imagesFile', this.selectedFiles[i], this.selectedFiles[i].name)
        }
      }

      if (this.id) {
        formData.append('id', this.id);
        formData.append('images', formValue.images);
      }
      formData.append('title', formValue.title);
      formData.append('content', formValue.content);
      formData.append('career_id', formValue.career_id);
      formData.append('location_id', formValue.location_id);
      formData.append('groups', formValue.groups);

      if (formValue.post_type === 'postNow') {
        formData.append('send_at', '0');
      } else {
        formData.append('send_at', getUnixTimeStamp(formValue.post_date, formValue.post_time).toString());
      }

      this.isLoading = true;
      this.apiPostService.save(formData).pipe(
        takeUntil(this._unsubscribe$)
      ).subscribe(data => {
        this.isLoading = false;

        if (data && data.status) {
          showToast(this.toastrService, null, 'Lưu thành công');
          this.activeModal.close('ok');
        }
      }, error => {
        this.isLoading = false;
      });

    }
  }

  validateForm(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  checkValid(control, typeError): boolean {
    return this.form.get(control).hasError(typeError) && (this.form.get(control).touched || this.form.get(control).dirty);
  }

  checkControlValid(control): boolean {
    return this.form.get(control).invalid && (this.form.get(control).touched || this.form.get(control).dirty);
  }

  onClose(): void {
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
