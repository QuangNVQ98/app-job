import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {INotification} from '../../../@core/interface/notification.interface';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {
  @Input() data: INotification;
  @Output() onClickItem = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.onClickItem.emit(this.data);
  }

}
