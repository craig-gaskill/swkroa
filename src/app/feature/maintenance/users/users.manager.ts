import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {UserState} from './store/user-store.state';
import {User} from '../../../core/user/user';
import {selectAllUsers, selectUsersLoadStatus, selectUsersViewStatus} from './store/user-store.selectors';
import {loadUsers, resetUsers, userAdd, userCancel, userDelete, userEdit, userSave} from './store/user-store.actions';
import {LoadStatus, ViewStatus} from '../../../app-store.state';

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
    this._userStore.dispatch(resetUsers());
  }

  public getViewStatus(): Observable<ViewStatus> {
    return this._userStore.select(selectUsersViewStatus);
  }

  public addUser(): void {
    this._userStore.dispatch(userAdd());
  }

  public editUser(user: User): void {
    this._userStore.dispatch(userEdit({user}));
  }

  public cancelUser(user: User): void {
    this._userStore.dispatch(userCancel({user}));
  }

  public saveUser(user: User): void {
    this._userStore.dispatch(userSave({user}));
  }

  public deleteUser(user: User): void {
    this._userStore.dispatch(userDelete({user}));
  }
}
