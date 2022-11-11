import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {showToast} from '../../../../../@core/helper/common.helper';

@Component({
  selector: 'app-quick-inbox',
  templateUrl: './quick-inbox.component.html',
  styleUrls: ['./quick-inbox.component.scss']
})
export class QuickInboxComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  isLoading: boolean;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    showToast(this.toastrService, null, 'Inbox thành công');
    this.activeModal.close();
  }

  onClose() {
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
