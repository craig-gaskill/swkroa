import {Inject, Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  private readonly ACCESS_TOKEN: string  = 'at';
  private readonly REFRESH_TOKEN: string = 'rt';

  private _userSubject = new BehaviorSubject<AuthorizedUser>(undefined);
  private _statusSubject = new BehaviorSubject<string>(undefined);

  constructor(private _httpClient: HttpClient,
              @Inject('AuthenticationServiceConfig') private _config: AuthenticationServiceConfig
  ) {
    const token = this.accessToken;
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
   * @return If there is a current user logged in and they have an expired JWT.
   */
  public get isExpired(): boolean {
    const authenticatedUser = this._userSubject.getValue();
    return !!(authenticatedUser && authenticatedUser.isExpired);
  }

  /**
   * @return If there is a current user logged in and if they must change their password.
   */
  public get mustChangePassword(): boolean {
    const authenticatedUser = this._userSubject.getValue();
    return !!(authenticatedUser && authenticatedUser.mustChangePassword);
  }

  /**
   * Will return the current access token (or null if the user isn't authenticated).
   */
  public get accessToken(): string {
    return sessionStorage.getItem(this.ACCESS_TOKEN);
  }

  /**
   * Will return the current refresh token (or null if the user isn't authenticated).
   */
  public get refreshToken(): string {
    return sessionStorage.getItem(this.REFRESH_TOKEN);
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
   * Will attempt to refresh the user's access token using the current refresh token.
   */
  public refresh(): Observable<AuthorizedUser> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'text/plain');

    const token = this.refreshToken;

    return this._httpClient.post<LoginResponse>(`${this._config.baseUrl}/refresh`, token, {headers: headers})
      .pipe(
        map(response => this.processResponse(response))
      );
  }

  /**
   * Will log the user out of the system.
   */
  public logout() {
    this._userSubject.next(undefined);
    this._statusSubject.next(undefined);

    sessionStorage.clear();
  }

  private processResponse(response: LoginResponse): AuthorizedUser {
    if (!response) {
      return undefined;
    } else {
      this._statusSubject.next(response.status);

      if (response.access) {
        sessionStorage.setItem(this.ACCESS_TOKEN, response.access);
        sessionStorage.setItem(this.REFRESH_TOKEN, response.refresh);

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
