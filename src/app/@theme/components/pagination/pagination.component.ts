import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import {IPagination} from '../../../@core/interface/api.interface';

// import { Pagination } from 'src/app/@core/interfaces/common.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cpd-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {
  @Input() props: IPagination;

  @Output() onChangePage = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  next(): void {
    this.onChangePage.emit('next');
  }

  prev(): void {
    this.onChangePage.emit('prev');
  }
}
