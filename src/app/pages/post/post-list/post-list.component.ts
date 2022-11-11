import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostFormComponent} from '../post-form/post-form.component';
import {Router} from '@angular/router';
import {IPost} from '../../../@core/interface/post.interface';
import {ApiPostService} from '../../../@core/api/api-post.service';
import {takeUntil} from 'rxjs/operators';
import {getPostStatus, showToast} from '../../../@core/helper/common.helper';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ICareer} from '../../../@core/interface/career.interface';
import {
  NO_DATA_MESSAGE,
  POST_GROUP_STATUS_COMPLETE,
  POST_GROUP_STATUS_PROCESSING,
  POST_GROUP_STATUS_WAITING,
  RECORD_PER_PAGE
} from '../../../@core/constants/app.constant';
import {IPagination} from '../../../@core/interface/api.interface';
import {ApiCareerService} from '../../../@core/api/api-career.service';
import {ToastrService} from 'ngx-toastr';
import {getCurrentUnixTimestamp} from '../../../@core/helper/moment.helper';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  @ViewChild('modalConfirm') modalConfirm: SwalComponent;
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  idTemp: any;
  data: IPost[];
  noDataMessage = NO_DATA_MESSAGE;
  getPostStatus = getPostStatus;

  formSearch: FormGroup;
  lstCareer: ICareer[];

  limit: number = RECORD_PER_PAGE;
  offset: number = 0;
  pagination: IPagination;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private _fb: FormBuilder,
    private apiPostService: ApiPostService,
    private _apiCareerService: ApiCareerService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this._apiCareerService.getList().pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.lstCareer = data.data;
    });

    this.buildFormSearch();
    this.search();
  }

  buildFormSearch() {
    this.formSearch = this._fb.group({
      title: [''],
      career_id: []
    });
  }

  search(): void {
    this.isLoading = true;
    const formValue = this.formSearch.value;

    const params = {
      title: formValue.title,
      career_id: formValue.career_id ? formValue.career_id : '',
      limit: this.limit,
      offset: this.offset
    };

    this.apiPostService.getList(params).pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.isLoading = false;

      if (data && data.status) {
        this.data = data.data.data;
        this.data = this.data.map(x => {
          return {...x,
            group_success: x.groups.filter(g => g.status == POST_GROUP_STATUS_COMPLETE).length,
            group_waiting: x.groups.filter(g => g.status == POST_GROUP_STATUS_PROCESSING).length,
            group_pending: x.groups.filter(g => g.status == POST_GROUP_STATUS_WAITING).length,
          };
        });
        this.pagination = {
          total: data.data.total,
          limit: this.limit,
          offset: this.offset
        };
      }
    }, error => {
      this.isLoading = false;
    });
  }

  openForm(id?) {
    const modalRef = this.modalService.open(PostFormComponent, { size: 'lg', backdrop: 'static', });
    if (id) {
      modalRef.componentInstance.id = id;
    }

    modalRef.result.then(data => {
      if (data) {
        this.search();
      }
    })
  }

  viewStatus(id) {
    this.router.navigate(['/pages/post/post-status'], {queryParams: {postId: id}});
  }

  onDelete(id): void {
    this.idTemp = id;
    this.modalConfirm.fire();
  }

  onSearch() {
    this.offset = 0;
    this.limit = 10;

    this.search();
  }

  changePage(type) {
    if (type === 'next') {
      this.offset += 1;

      this.search();
    } else {
      this.offset -= 1;

      this.search();
    }
  }

  canEdit(sendAt) {
    return sendAt > getCurrentUnixTimestamp();
  }

  confirm(): void {
    this.isLoading = true;
    this.apiPostService.delete(this.idTemp).pipe(
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

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
