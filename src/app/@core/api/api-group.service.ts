import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as API_URL from './api-url';
import { IApiResponse, IPagination } from '../interface/api.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiGroupService {
  constructor(private httpClient: HttpClient) { }

  getList(params?): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.GROUP_GET_LIST, {params: params});
  }

  save(body): Observable<any> {
    return this.httpClient.post(API_URL.GROUP_SAVE, body);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(API_URL.GROUP_DELETE + `/${id}`);
  }

  changeStatus(id): Observable<any> {
    return this.httpClient.post(API_URL.GROUP_CHANGE_STATUS + `/${id}`, null);
  }

  getById(id): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.GROUP_GET_BY_ID + `/${id}`);
  }

  searchGroup(params?): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.GROUP_SEARCH, {params: params});
  }

  getMemberByStatus(id, status): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.GROUP_GET_MEMBER_BY_STATUS + `/${id}`, {params: {status}});
  }

  getListByCareer(params): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.GROUP_GET_LIST_BY_CAREER, {params});
  }
}
