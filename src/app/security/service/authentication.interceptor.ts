import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private readonly AUTHORIZATION = 'Authorization';

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('at');
    if (token) {
      if (!req.headers.has(this.AUTHORIZATION)) {
        const authorizedRequest = req.clone({headers: req.headers.set(this.AUTHORIZATION, `Bearer ${token}`)});

        return next.handle(authorizedRequest);
      }
    }

    return next.handle(req);
  }
}
