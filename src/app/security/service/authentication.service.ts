import {Inject, Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AuthorizedUser} from '../authorized-user.model';
import {AuthenticationUtilities} from '../authentication.utilities';
import {AuthenticationStatus} from '../authentication-status.enum';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
  private _userSubject = new BehaviorSubject<AuthorizedUser>(undefined);
  private _statusSubject = new BehaviorSubject<string>(undefined);

  constructor(private _httpClient: HttpClient,
              @Inject('AuthenticationServiceConfig') private _config: AuthenticationServiceConfig
  ) {
    const token = sessionStorage.getItem('at');
    if (token) {
      const authorizedUser = AuthenticationUtilities.decodeToken(token, AuthenticationStatus.STATUS_VALID);
      this._userSubject.next(authorizedUser);
    }
  }

  /**
   * Completes the active subject, signalling to all other observables to complete.
   */
  public ngOnDestroy(): void {
    this._userSubject.complete();
  }

  /**
   * Will attempt to authenticate the user.
   *
   * @param loginRequest
   *    Contains the username and password of the user trying to authenticate.
   */
  public login(loginRequest: LoginRequest): Observable<AuthorizedUser> {
    return this._httpClient.post<LoginResponse>(`${this._config.baseUrl}/login`, loginRequest)
      .pipe(
        map(response => this.processResponse(response))
      );
  }

  /**
   * Allows the caller to subscribe to the `currentUser` so the application can respond to changes to the currentUser such as:
   *
   * 1. Logging in
   * 2. Logging out
   * 3. Switching users
   */
  public get currentUser(): Observable<AuthorizedUser> {
    return this._userSubject.asObservable();
  }

  /**
   * @return If there is a current user logged in and they have authenticated.
   */
  public get isAuthenticated(): boolean {
    const authenticatedUser = this._userSubject.getValue();
    return !!(authenticatedUser && authenticatedUser.isAuthenticated);
  }

  /**
   * @return If there is a current user logged in and if they must change their password.
   */
  public get mustChangePassword(): boolean {
    const authenticatedUser = this._userSubject.getValue();
    return !!(authenticatedUser && authenticatedUser.mustChangePassword);
  }

  private processResponse(response: LoginResponse): AuthorizedUser {
    if (!response) {
      return undefined;
    } else {
      this._statusSubject.next(response.status);

      if (response.access) {
        sessionStorage.setItem('at', response.access);
        sessionStorage.setItem('rt', response.refresh);

        const authorizedUser = AuthenticationUtilities.decodeToken(response.access, response.status);
        this._userSubject.next(authorizedUser);

        return authorizedUser;
      } else {
        return undefined;
      }
    }
  }
}

/**
 * Interface used by consumers of this API to configure the URL of the application-specific endpoint.
 */
export interface AuthenticationServiceConfig {
  baseUrl: string;
}
