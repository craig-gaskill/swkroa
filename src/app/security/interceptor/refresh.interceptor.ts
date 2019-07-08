import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';

import {AuthenticationService} from '../service/authentication.service';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  private _refreshTokenInProgress = false;
  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private _refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _authService: AuthenticationService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(err => {
          if (err.status !== 401) {
            // the error wasn't an UNAUTHORIZED error
            return throwError(err);
          }

          if (req.url.includes('auth')) {
            // the error occurred when authenticating (or refreshing the authentication)
            this._authService.logout();
            return throwError(err);
          }

          if (this._refreshTokenInProgress) {
            // we are in the process of requesting a new token
            return this._refreshTokenSubject
              .pipe(
                filter(result => result !== null),
                take(1),
                switchMap(() => next.handle(this.addAuthenticationToken(req)))
              );
          } else {
            // request a new token
            this._refreshTokenInProgress = true;

            // set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this._refreshTokenSubject.next(null);

            this._authService.refresh()
              .pipe(
                switchMap(result => {
                  this._refreshTokenInProgress = false;
                  this._refreshTokenSubject.next(result);

                  return next.handle(this.addAuthenticationToken(req));
                }),
                catchError(error => {
                  this._refreshTokenInProgress = false;
                  this._authService.logout();

                  return throwError(error);
                })
              );
          }
        })
      );
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this._authService.accessToken;

    // if access token is null this means that user is not logged in
    // and we return the original request
    if (!token) {
      return request;
    }

    // we clone the request, because the original request is immutable
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
