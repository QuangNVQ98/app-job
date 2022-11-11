import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as API_URL from './api-url';
import { IApiResponse } from '../interface/api.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAccountFbService {
  constructor(private httpClient: HttpClient) { }

  getList(params?): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.ACCOUNT_FB_GET_LIST, {params: params});
  }

  save(body): Observable<any> {
    return this.httpClient.post(API_URL.ACCOUNT_FB_SAVE, body);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(API_URL.ACCOUNT_FB_DELETE + '/' + id);
  }

  getById(id): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.ACCOUNT_FB_GET_BY_ID + `/${id}`);
  }

  getGroupByStatus(id, status?) {
    return this.httpClient.get<IApiResponse>(API_URL.ACCOUNT_FB_GROUP_BY_STATUS + `/${id}`, {params: status ? {status} : {}});
  }

  getListPost(id, params) {
    return this.httpClient.get<IApiResponse>(API_URL.ACCOUNT_FB_GET_LIST_POST + `/${id}`, {params: params});
  }
}
