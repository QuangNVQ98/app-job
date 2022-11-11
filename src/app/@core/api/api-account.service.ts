import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as API_URL from './api-url';
import { IApiResponse, IPagination } from '../interface/api.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAccountService {
  constructor(private httpClient: HttpClient) { }

  getList(): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.ACCOUNT_GET_LIST);
  }

  save(body): Observable<any> {
    return this.httpClient.post(API_URL.ACCOUNT_SAVE, body);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(API_URL.ACCOUNT_DELETE + '/' + id);
  }

  getById(id): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.ACCOUNT_GET_BY_ID + `/${id}`);
  }

  updateProfile(body): Observable<any> {
    return this.httpClient.post(API_URL.ACCOUNT_UPDATE_PROFILE, body);
  }

  changePassword(body): Observable<any> {
    return this.httpClient.post(API_URL.ACCOUNT_CHANGE_PASSWORD, body);
  }
}
