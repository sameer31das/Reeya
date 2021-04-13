import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('msal.idtoken') !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('msal.idtoken')}`
        }
      });
    }
    else
    {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer 4A7841D4-5A29-4345-B4BF-DC7BC5D68735`
        }
      });
    }
    return next.handle(request);
  }
}
