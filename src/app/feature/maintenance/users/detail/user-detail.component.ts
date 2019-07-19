import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {User} from '../../../../core/user/user';
import {UsersManager} from '../users.manager';

@Component({
  selector: 'swkroa-user-detail',
  templateUrl: './user-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {
  private _user: User;

  public formGroup: FormGroup;
  public editing = false;

  @Input()
  public get user(): User {
    return this._user;
  }

  public set user(value: User) {
    this._user = value;

    this.formGroup.reset({
      firstName: value ? value.person.firstName : undefined,
      lastName: value ? value.person.lastName : undefined
    });
  }

  constructor(private _formBuilder: FormBuilder,
              private _dialog: MatDialog,
              private _usersManager: UsersManager
  ) {
    this.formGroup = this._formBuilder.group({
      firstName: undefined,
      lastName: undefined
    });
  }

  public ngOnInit(): void {
  }
}
