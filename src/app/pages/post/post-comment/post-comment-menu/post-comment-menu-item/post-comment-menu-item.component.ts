import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FACEBOOK_DOMAIN, FACEBOOK_HOST} from '../../../../../@core/constants/app.constant';
import {IComment} from '../../../../../@core/interface/comment.interface';

@Component({
  selector: 'app-post-comment-menu-item',
  templateUrl: './post-comment-menu-item.component.html',
  styleUrls: ['./post-comment-menu-item.component.scss']
})
export class PostCommentMenuItemComponent implements OnInit {
  @Input() data: IComment;
  @Output() onClickItem = new EventEmitter<any>();
  @Input() parentCurId: any;

  fbHost = FACEBOOK_HOST;
  fbDomain = FACEBOOK_DOMAIN;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.onClickItem.emit(this.data);
  }

}
