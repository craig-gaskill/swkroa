import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';

import {User} from '../../../../core/user/user';
import {UsersManager} from '../users.manager';
import {CgtConfirmationComponent, CgtConfirmationContext} from '@cagst/ngx-components';
import {ViewStatus} from '../../../../app-store.state';
import {StandardDictionaries} from '../../../../core/dictionary/standard-dictionaries';

@Component({
  selector: 'swkroa-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {
  public readonly VIEW_STATUS = ViewStatus;
  public readonly STANDARD_DICTIONARIES = StandardDictionaries;

  private _user: User;

  public formGroup: FormGroup;
  public viewStatus$: Observable<ViewStatus>;
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
      titleCd: undefined,
      firstName: undefined,
      middleName: undefined,
      lastName: undefined
    });
  }

  public ngOnInit(): void {
    if (this._user && !this._user.userId) {
      // if it is a new User
      // place in edit mode so they can complete it
      this.editing = true;
    }

    this.viewStatus$ = this._usersManager.getViewStatus();
  }

  public onEdit(): void {
    this.editing = true;
    this._usersManager.editUser(this._user);
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

  public onSave(): void {
    const formModel = this.formGroup.value;
  }

  public onCancel(): void {
    this.editing = false;
    this.user = this._user;
    this._usersManager.cancelUser(this._user);
  }

  private resetForm(user: User) {
    this.formGroup.reset({
      titleCd: user ? user.person.titleCd : undefined,
      firstName: user ? user.person.firstName : undefined,
      middleName: user ? user.person.middleName : undefined,
      lastName: user ? user.person.lastName : undefined
    });
  }
}
