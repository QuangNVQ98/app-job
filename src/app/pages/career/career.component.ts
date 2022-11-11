import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CareerFormComponent} from './career-form/career-form.component';
import {ApiCareerService} from '../../@core/api/api-career.service';
import {ICareer} from '../../@core/interface/career.interface';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {showToast} from '../../@core/helper/common.helper';
import {ToastrService} from 'ngx-toastr';
import {NO_DATA_MESSAGE} from '../../@core/constants/app.constant';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  @ViewChild('modalConfirm') modalConfirm: SwalComponent;
  idTemp: any;
  data: ICareer[];
  noDataMessage = NO_DATA_MESSAGE;

  constructor(
    private modalService: NgbModal,
    private apiCareerService: ApiCareerService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.search();
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  search(): void {
    //hien thi loading
    this.isLoading = true;
    this.apiCareerService.getList().pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.isLoading = false;

      if (data && data.status) {
        this.data = data.data;
      }
    }, error => {
      this.isLoading = false;
    });
  }

  openForm(id?): void {
    const modalRef = this.modalService.open(CareerFormComponent, { size: 'lg', backdrop: 'static' });
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
    this.apiCareerService.delete(this.idTemp).pipe(
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

}
