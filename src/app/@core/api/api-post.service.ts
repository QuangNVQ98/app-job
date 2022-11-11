import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import * as API_URL from './api-url';
import { IApiResponse, IPagination } from '../interface/api.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiPostService {
  constructor(private httpClient: HttpClient) { }

  getList(params?): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.POST_GET_LIST, {params: params});
  }

  save(body): Observable<any> {
    return this.httpClient.post(API_URL.POST_SAVE, body);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(API_URL.POST_DELETE + '/' + id);
  }

  getById(id): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.POST_GET_BY_ID + `/${id}`);
  }

  getGroupByStatus(id, status): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.POST_GROUP_BY_STATUS + `/${id}`, {params: {status}});
  }

  getComment(id): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.POST_GET_COMMENT + `/${id}`);
  }

  sendComment(id, body): Observable<any> {
    return this.httpClient.post(API_URL.POST_SEND_COMMENT + `/${id}`, body);
  }
}
