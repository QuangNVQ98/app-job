import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {EventService} from '../../../../@core/service/event.service';

@Component({
  selector: 'app-inbox-detail',
  templateUrl: './inbox-detail.component.html',
  styleUrls: ['./inbox-detail.component.scss']
})
export class InboxDetailComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  @Input() isLoading: boolean;
  data: any;
  private _eventSubscription: Subscription;
  currItem: any;

  constructor(
    private _eventService: EventService
  ) { }

  ngOnInit(): void {
    this.data = [
      {send_id: '1', message: 'Tin nhắn khách 1'},
      {send_id: '1', message: 'Tin nhắn khách2'},
      {send_id: '2', message: 'Tin nhắn chủ 1'},
      {send_id: '1', message: 'Tin nhắn khách 3'},
      {send_id: '2', message: 'Tin nhắn chủ 2'},
      {send_id: '2', message: 'Tin nhắn chủ 3'},
      {send_id: '2', message: 'Tin nhắn chủ 4'},
      {send_id: '2', message: 'Tin nhắn chủ Tin nhắn chủ Tin nhắn chủ Tin nhắn chủ'},
    ];

    this._eventSubscription = this._eventService.postStatusItem$.subscribe(data => {
      this.currItem = data;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();

    if (this._eventSubscription) {
      this._eventSubscription.unsubscribe();
    }
  }

}
