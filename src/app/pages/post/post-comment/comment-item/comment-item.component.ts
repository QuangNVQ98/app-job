import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../../../../@core/interface/comment.interface';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FACEBOOK_DOMAIN, FACEBOOK_HOST} from '../../../../@core/constants/app.constant';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  @Input() data: IComment;
  fbHost = FACEBOOK_HOST;
  fbDomain = FACEBOOK_DOMAIN;

  constructor() { }

  ngOnInit(): void {
  }
}
