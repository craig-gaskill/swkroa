import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {UserState} from './store/user-store.state';
import {User} from '../../../core/user/user';
import {selectAllUsers, selectUsersLoadStatus} from './store/user-store.selectors';
import {LoadStatus} from '../dictionaries/store/dictionary-store.state';
import {loadUsers} from './store/user-store.actions';

@Injectable()
export class UsersManager {
  constructor(private _userStore: Store<UserState>) { }

  /**
   * Will return an {Observable} that can be subscribed to to listen for changes to the list of Users.
   */
  public selectAllUsers(): Observable<User[]> {
    return this._userStore.select(selectAllUsers);
  }

  /**
   * Will load the users and set that as the list of users, appending if necessary
   */
  public loadAllUsers(): Observable<LoadStatus> {
    this._userStore.dispatch(loadUsers());
    return this._userStore.select(selectUsersLoadStatus);
  }

  /**
   * Will reset the UsersStore back to its initial state.
   */
  public resetUsers(): void {
  }

  public addUser(): void {
  }

  public cancelUser(user: User): void {
  }

  public saveUser(user: User): void {
  }

  public deleteUser(user: User): void {
  }
}
