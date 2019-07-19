import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from '../base.service';
import {Observable} from 'rxjs';
import {User} from './user';
import {catchError} from 'rxjs/operators';

/**
 * Interface used by consumers of this API to configure the URL of the application-specific endpoint.
 * When implementing, set {@code baseUrl} to the API base with the user endpoint appended.
 * It is recommended to store this in an {@code environment} file.
 */
export interface UserServiceConfig {
  baseUrl: string;
}

/**
 * Service used to get users. {@link UserServiceConfig} must be implemented in the calling app.
 * To provide your implementation, add the following to your root module <code>providers</code> array:
 * <code>{ provide: "UserServiceConfig", useClass: **Implemented class name** }</code>
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private readonly BASE_URL: string;

  constructor(private _httpClient: HttpClient,
              @Inject('UserServiceConfig') private _config: UserServiceConfig
  ) {
    super();
    this.BASE_URL = _config.baseUrl;
  }

  /**
   * Get the list of users.
   *
   * @param start Optional low-end parameter used in pagination.
   * @param limit Optional high-end parameter used in pagination.
   * @param name Optional search parameter used to filter the returned results.
   *
   * @returns An {@link Observable} of {@link User} objects.
   */
  public getUsers(start = 0, limit = 20, name?: string): Observable<User[]> {
    let params = new HttpParams()
      .set('start', start.toString())
      .set('limit', limit.toString());

    if (name != null) {
      params = params.set('name', name);
    }

    return this._httpClient.get<User[]>(this.BASE_URL, {params})
      .pipe(
        this.deserializeJsonArray(User),
        catchError(this.handleError)
      );
  }
}
