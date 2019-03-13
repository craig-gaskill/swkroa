import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthenticationService} from '../service/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private readonly AUTHORIZATION = 'Authorization';

  constructor(private _authService: AuthenticationService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('auth/login') || req.url.includes('auth/refresh')) {
      // these URLs don't require an Authorization header
      return next.handle(req);
    }

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
