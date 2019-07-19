import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../../../core/user/user.service';
import {CgtNotificationService} from '@cagst/ngx-components';
import {loadUsers, loadUsersFailed, loadUsersSucceeded} from './user-store.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class UserStoreEffects {
  constructor(private _actions$: Actions,
              private _userService: UserService,
              private _notificationService: CgtNotificationService
  ) { }

  /**
   * Effect that responds to the [loadUsers] action to retrieve Users from the back-end.
   */
  public loadUsers$ = createEffect(() => this._actions$
    .pipe(
      ofType(loadUsers),
      exhaustMap(() => this._userService.getUsers(0, 0)
        .pipe(
          map(users => loadUsersSucceeded({users})),
          catchError(err => of(loadUsersFailed({error: err.error.message})))
        )
      )
    )
  );
}
