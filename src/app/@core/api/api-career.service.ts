import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as API_URL from './api-url';
import { IApiResponse } from '../interface/api.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCareerService {
  constructor(private httpClient: HttpClient) { }

  getList(): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.CAREER_GET_LIST);
  }

  save(body): Observable<any> {
    return this.httpClient.post(API_URL.CAREER_SAVE, body);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(API_URL.CAREER_DELETE + '/' + id);
  }

  getById(id): Observable<IApiResponse> {
    return this.httpClient.get<IApiResponse>(API_URL.CAREER_GET_BY_ID + `/${id}`);
  }
}
