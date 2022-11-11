import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {showToast} from '../helper/common.helper';
import {ToastrService} from 'ngx-toastr';
import * as API_URL from './api-url';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  ignoreApi: string[] = [API_URL.AUTH_LOGIN, API_URL.AUTH_FORGOT_PASSWORD, API_URL.AUTH_RESET_PASSWORD];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string = '';
    if (sessionStorage.getItem('token')) {
      token = sessionStorage.getItem('token');
    } else if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }

    const url = request.url;
    if (!this.ignoreApi.includes(url)) {
      const commonReq = request.clone({
        headers: request.headers.set('Authorization', token)
      });

      return next.handle(commonReq);
    }

    return next.handle(request);
  }
}

@Injectable()
export class HttpSuccessInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      distinctUntilChanged(),
      debounceTime(100),
      tap((res: any) => {
        if (res instanceof HttpResponse && !(res instanceof HttpErrorResponse)) {
          const resBody = res.body;
          if (resBody.status === false) {
            showToast(this.toastrService, null, resBody.message, 'warning');
          }
        }
      })
    );
  }

}
