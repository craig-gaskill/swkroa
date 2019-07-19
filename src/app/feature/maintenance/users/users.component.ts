import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../../../core/user/user';
import {UsersManager} from './users.manager';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(private _usersManager: UsersManager) { }

  public ngOnInit() {
    this.users$ = this._usersManager.selectAllUsers();
    this._usersManager.loadAllUsers();
  }
}
