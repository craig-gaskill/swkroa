import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthenticationService} from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private _router: Router, private _authorizationService: AuthenticationService) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // if the user is authenticated, allow the navigation to continue
    if (this._authorizationService.isAuthenticated) {
      return true;
    }

    // if the user must change their password, navigate to the change password page.
    if (this._authorizationService.mustChangePassword) {
      this._router.navigate(['auth/changePwd'], {queryParams: {returnUrl: state.url}});
      return false;
    }

    // otherwise, they must log in
    this._router.navigate(['auth/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
