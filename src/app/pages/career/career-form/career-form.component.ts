import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiCareerService} from '../../../@core/api/api-career.service';
import {showToast} from '../../../@core/helper/common.helper';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SelectItemModel} from '../../../@theme/components/select/select-item.model';

@Component({
  selector: 'app-career-form',
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.scss']
})
export class CareerFormComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  id: any;
  form: FormGroup;
  isLoading: boolean;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiCareerService: ApiCareerService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    if (this.id) {
      this.isLoading = true;

      this.apiCareerService.getById(this.id).pipe(
        takeUntil(this._unsubscribe$)
      ).subscribe(data => {
        this.isLoading = false;

        if (data && data.status) {
          this.form.patchValue(data.data);
        }
      }, error => {
        this.isLoading = false;
      });
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
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
      this.apiCareerService.save(body).pipe(
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

  onClose(): void {
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
