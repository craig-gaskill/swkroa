import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {User} from '../../../../core/user/user';
import {UsersManager} from '../users.manager';

@Component({
  selector: 'swkroa-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
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
    this.resetForm(this._user);
  }

  constructor(private _formBuilder: FormBuilder,
              private _dialog: MatDialog,
              private _usersManager: UsersManager
  ) {
    this.formGroup = this._formBuilder.group({
      firstName: undefined,
      middleName: undefined,
      lastName: undefined
    });
  }

  public ngOnInit(): void {
  }

  private resetForm(user: User) {
    this.formGroup.reset({
      firstName: user ? user.person.firstName : undefined,
      middleName: user ? user.person.middleName : undefined,
      lastName: user ? user.person.lastName : undefined
    });
  }
}
