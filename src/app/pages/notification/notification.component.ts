import { Component, OnInit } from '@angular/core';
import {INotification} from '../../@core/interface/notification.interface';
import {RECORD_PER_PAGE} from '../../@core/constants/app.constant';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  data: INotification[];

  limit: number = RECORD_PER_PAGE;
  offset: number = 0;
  totalRecord: number;

  constructor() { }

  ngOnInit(): void {
    this.data = [
      {_id: '1', content: 'Bài viết trong nhóm Mua bán ô tô có thông báo', created: 1619421510},
      {_id: '2', content: 'Bài viết trong nhóm Mua bán xe máy có thông báo', created: 1619421510},
      {_id: '3', content: 'Bài viết trong nhóm Mua bán nhà đất có thông báo', created: 1619421510},
      {_id: '1', content: 'Bài viết trong nhóm Mua bán ô tô có thông báo', created: 1619421510},
      {_id: '2', content: 'Bài viết trong nhóm Mua bán xe máy có thông báo', created: 1619421510},
      {_id: '3', content: 'Bài viết trong nhóm Mua bán nhà đất có thông báo', created: 1619421510},
      {_id: '1', content: 'Bài viết trong nhóm Mua bán ô tô có thông báo', created: 1619421510},
      {_id: '2', content: 'Bài viết trong nhóm Mua bán xe máy có thông báo', created: 1619421510},
      {_id: '3', content: 'Bài viết trong nhóm Mua bán nhà đất có thông báo', created: 1619421510},
      {_id: '1', content: 'Bài viết trong nhóm Mua bán ô tô có thông báo', created: 1619421510},
      {_id: '2', content: 'Bài viết trong nhóm Mua bán xe máy có thông báo', created: 1619421510},
      {_id: '3', content: 'Bài viết trong nhóm Mua bán nhà đất có thông báo', created: 1619421510},
    ];
  }

  searchNotification() {
    const obj = {
      offset: this.offset,
      limit: this.limit
    };
  }

  itemClicked(data) {

  }

  scrollListNotification() {
    if (this.offset * this.limit < this.totalRecord) {
      this.offset += 1;
      this.searchNotification();
    }
  }

}
