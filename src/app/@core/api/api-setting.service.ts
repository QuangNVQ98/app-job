import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as API_URL from './api-url';
import { IApiResponse } from '../interface/api.interface';
import {Observable} from 'rxjs';
import {SETTING_GET_SAVE} from './api-url';

@Injectable({
  providedIn: 'root',
})
export class ApiSettingService {
  constructor(private httpClient: HttpClient) { }

  getSetting(): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.SETTING_GET_SETTING);
  }

  save(body): Observable<any> {
    return this.httpClient.post(API_URL.SETTING_GET_SAVE, body);
  }
}
