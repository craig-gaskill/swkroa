import {Action, createReducer, on} from '@ngrx/store';

import {loadUsers, loadUsersFailed, loadUsersSucceeded} from './user-store.actions';
import {initialUserState, LoadStatus, UserState} from './user-store.state';

const reducer = createReducer(initialUserState,
  on(loadUsers, (state) => ({
    ...state,
    users: undefined,
    usersLoadStatus: LoadStatus.Loading,
    usersLoadError: undefined
  })),
  on(loadUsersSucceeded, (state, action) => ({
    ...state,
    users: action.users,
    usersLoadStatus: (action.users && action.users.length > 0 ? LoadStatus.Loaded : LoadStatus.NoContent)
  })),
  on(loadUsersFailed, (state, action) => ({
    ...state,
    usersLoadStatus: LoadStatus.Error,
    usersLoadError: action.error
  }))
);

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
