import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SelectItemModel} from '../../../@theme/components/select/select-item.model';
import {ICareer} from '../../../@core/interface/career.interface';
import {ILocation} from '../../../@core/interface/location.interface';
import {ApiCareerService} from '../../../@core/api/api-career.service';
import {ApiGroupService} from '../../../@core/api/api-group.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {checkFileValid, showToast} from '../../../@core/helper/common.helper';
import {ToastrService} from 'ngx-toastr';
import {AddressService} from '../../../@core/service/address.service';
import {ARRAY_TYPE_IMAGE} from '../../../@core/constants/app.constant';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  id: any;
  form: FormGroup;
  lstCareer: ICareer[];
  lstLocation: ILocation[];
  selectedFile: File;
  urlTemp: any;
  isIdRequired = true;
  isUsernameRequired = true;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiCareerService: ApiCareerService,
    private apiGroupService: ApiGroupService,
    private toastrService: ToastrService,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.apiCareerService.getList().pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.lstCareer = data.data;
    });

    this.lstLocation = this.addressService.getProvinces();

    this.buildForm();

    if (this.id) {
      this.isLoading = true;

      this.apiGroupService.getById(this.id).pipe(
        takeUntil(this._unsubscribe$)
      ).subscribe(data => {
        this.isLoading = false;

        if (data && data.status) {
          this.patchFormValue(data.data);
        }
      }, error => {
        this.isLoading = false;
      });
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      groupFbId: [''],
      groupFbUsername: [''],
      name: ['', Validators.required],
      careerId: [null, Validators.required],
      locationId: [null, Validators.required],
      avatar: ['']
    });
  }

  get groupFbId() {
    return this.form.get('groupFbId');
  }

  get groupFbUsername() {
    return this.form.get('groupFbUsername');
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

  patchFormValue(obj):void {
    this.form.patchValue({
      groupFbId: obj.group_fbid,
      groupFbUsername: obj.group_fbusername,
      name: obj.name,
      careerId: obj.career_id,
      locationId: obj.location_id,
      avatar: obj.avatar
    });

    this.checkValidate();
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

  checkValidate() {
    const groupFbUsername = this.form.get('groupFbUsername').value;
    const groupFbId = this.form.get('groupFbId').value;

    if (groupFbId) {
      this.isUsernameRequired = false;
      this.form.get('groupFbUsername').clearValidators();
      this.form.get('groupFbUsername').updateValueAndValidity({onlySelf: true});
    } else {
      this.isUsernameRequired = true;
      this.form.get('groupFbUsername').setValidators([Validators.required]);
      this.form.get('groupFbUsername').updateValueAndValidity({onlySelf: true});
    }

    if (groupFbUsername) {
      this.isIdRequired = false;
      this.form.get('groupFbId').clearValidators();
      this.form.get('groupFbId').updateValueAndValidity({onlySelf: true});
    } else {
      this.isIdRequired = true;
      this.form.get('groupFbId').setValidators([Validators.required]);
      this.form.get('groupFbId').updateValueAndValidity({onlySelf: true});
    }
  }

  onSubmit(): void {
    this.checkValidate();
    this.validateForm();

    if (this.form.valid) {
      const body = this.form.value;
      const formData = new FormData();

      if (this.id) {
        formData.append('id', this.id);
      }

      if (this.selectedFile) {
        formData.append('imagesFile', this.selectedFile, this.selectedFile.name)
      }

      formData.append('groupFbId', body.groupFbId);
      formData.append('groupFbUsername', body.groupFbUsername);
      formData.append('name', body.name);
      formData.append('careerId', body.careerId);
      formData.append('locationId', body.locationId);

      this.isLoading = true;
      this.apiGroupService.save(formData).pipe(
        takeUntil(this._unsubscribe$)
      ).subscribe(data => {
        this.isLoading = false;

        if (data && data.error_code === 204 ) {
          this.form.get('groupFbId').setErrors({notUnique: true});
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
