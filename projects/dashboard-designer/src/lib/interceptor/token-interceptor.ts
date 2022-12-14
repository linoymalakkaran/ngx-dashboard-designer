import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DASHBOARD_CONFIG } from '../injectors/dashboard-injectors';
import { DashboardModuleConfigModel } from '../models';

@Injectable()
export class DashboardDesignerTokenInterceptor implements HttpInterceptor {
  dashboardModuleConfigModel: DashboardModuleConfigModel;

  constructor(
    @Inject(DASHBOARD_CONFIG)
    private config: DashboardModuleConfigModel
  ) {
    this.dashboardModuleConfigModel = config;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url && request.url.toLowerCase().includes('/api/')) {
      return next
        .handle(
          this.addToken(
            request,
            this.dashboardModuleConfigModel.headers.bearerTokenName
          )
        )
        .pipe(
          catchError(err => {
            if (err.status === 401) {
              // return this.handle401Error(request, next);
            } else if (err.status === 403) {
            }
            return throwError(err);
          })
        );
    } else {
      return next.handle(request);
    }
  }

  private addToken(req: HttpRequest<any>, tokenName: string): HttpRequest<any> {
    const token = localStorage.getItem(tokenName);
    if (token) {
      return token
        ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
        : req.clone({
            setHeaders: {
              'Cache-Control': 'no-store, no-cache,  max-age=0',
              Pragma: 'no-cache',
              Expires: '0'
            }
          });
    } else {
      return token
        ? req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + token,
              'Cache-Control': 'no-store, no-cache,  max-age=0',
              Pragma: 'no-cache',
              Expires: '0'
            }
          })
        : req.clone({
            setHeaders: {
              'Cache-Control': 'no-store, no-cache,  max-age=0',
              Pragma: 'no-cache',
              Expires: '0'
            }
          });
    }
  }
}
