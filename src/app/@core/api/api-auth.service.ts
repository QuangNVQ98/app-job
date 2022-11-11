import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as API_URL from './api-url';
import { IApiResponse, IPagination } from '../interface/api.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  constructor(private httpClient: HttpClient) { }

  login(body): Observable<any> {
    return this.httpClient.post(API_URL.AUTH_LOGIN, body);
  }

  checkToken(token): Observable<any> {
    return this.httpClient.post(API_URL.AUTH_CHECK_TOKEN, token);
  }

  forgotPassword(body): Observable<any> {
    return this.httpClient.post(API_URL.AUTH_FORGOT_PASSWORD, body);
  }

  resetPassword(body): Observable<any> {
    return this.httpClient.post(API_URL.AUTH_RESET_PASSWORD, body);
  }
}
