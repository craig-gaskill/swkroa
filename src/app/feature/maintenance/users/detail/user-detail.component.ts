import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {User} from '../../../../core/user/user';
import {UsersManager} from '../users.manager';
import {CgtConfirmationComponent, CgtConfirmationContext} from '@cagst/ngx-components';

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

  public onEdit(): void {
    this.editing = true;
  }

  public onDelete(): void {
    const confirmDelete: CgtConfirmationContext = {
      title: 'Please Confirm',
      message: `Are you sure you want to delete <b>${this.user.person}</b>?`,
      acceptText: 'Confirm',
      acceptData: 'CONFIRM',
      declineText: 'Cancel',
      declineData: 'CANCEL'
    };

    this._dialog.open(CgtConfirmationComponent, {data: confirmDelete, autoFocus: false})
      .afterClosed()
      .subscribe(result => result === confirmDelete.acceptData ? this._usersManager.deleteUser(this._user) : undefined);
  }

  private resetForm(user: User) {
    this.formGroup.reset({
      firstName: user ? user.person.firstName : undefined,
      middleName: user ? user.person.middleName : undefined,
      lastName: user ? user.person.lastName : undefined
    });
  }
}
