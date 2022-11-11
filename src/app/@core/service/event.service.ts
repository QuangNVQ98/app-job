import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private _postStatusItem = new Subject<any>();
  postStatusItem$ = this._postStatusItem.asObservable();

  constructor() { }

  postStatusEmitData(data) {
    this._postStatusItem.next(data);
  }
}
