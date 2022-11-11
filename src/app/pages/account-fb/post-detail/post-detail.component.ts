import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {ApiPostService} from '../../../@core/api/api-post.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  id: any;
  data: any;

  constructor(
    private activeModal: NgbActiveModal,
    private _apiPostService: ApiPostService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this._apiPostService.getById(this.id).pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(data => {
      this.isLoading = false;
      if (data && data.status) {
        this.data = data.data;
      }
    })
  }

  onClose(): void {
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
