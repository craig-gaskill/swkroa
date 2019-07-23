import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../../../core/user/user';
import {UsersManager} from './users.manager';
import {ViewStatus} from '../../../app-store.state';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  public readonly VIEW_STATUS = ViewStatus;

  public users$: Observable<User[]>;
  public viewStatus$: Observable<ViewStatus>;

  constructor(private _usersManager: UsersManager) { }

  public ngOnInit() {
    this.users$ = this._usersManager.selectAllUsers();
    this.viewStatus$   = this._usersManager.getViewStatus();

    this._usersManager.loadAllUsers();
  }

  public ngOnDestroy(): void {
    this._usersManager.resetUsers();
  }

  public onAddUser(): void {
    this._usersManager.addUser();
  }
}
