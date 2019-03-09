import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthenticationService} from '../service/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private readonly AUTHORIZATION = 'Authorization';

  constructor(private _authService: AuthenticationService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._authService.accessToken;
    if (token) {
      if (!req.headers.has(this.AUTHORIZATION)) {
        return next.handle(req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        }));
      }
    }

    return next.handle(req);
  }
}
