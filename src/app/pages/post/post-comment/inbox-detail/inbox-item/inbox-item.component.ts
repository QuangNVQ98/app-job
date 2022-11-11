import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-inbox-item',
  templateUrl: './inbox-item.component.html',
  styleUrls: ['./inbox-item.component.scss']
})
export class InboxItemComponent implements OnInit {
  @Input() data: any;
  currId = '2';

  constructor() { }

  ngOnInit(): void {
  }

}
