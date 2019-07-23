import {Action, createReducer, on} from '@ngrx/store';

import {
  loadUsers,
  loadUsersFailed,
  loadUsersSucceeded,
  resetUsers,
  userAdd, userCancel,
  userCreated, userDeleted, userEdit,
  userUpdated
} from './user-store.actions';
import {initialUserState, UserState} from './user-store.state';
import {User} from '../../../../core/user/user';
import {LoadStatus, ViewStatus} from '../../../../app-store.state';

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
  })),
  on(resetUsers, () => initialUserState),
  on(userAdd, (state) => {
    const users = [...state.users, new User()];

    return {
      ...state,
      users,
      usersViewStatus: ViewStatus.Add
    };
  }),
  on(userEdit, (state) => {
    return {
      ...state,
      usersViewStatus: ViewStatus.Edit
    };
  }),
  on(userCreated, (state, action) => {
    const updatedUsers = [...state.users];

    // the user was created successfully, remove the placeholder one (the one w/o an ID)
    const idx = updatedUsers.findIndex(usr => !usr.userId);
    if (idx >= 0) {
      updatedUsers.splice(idx, 1, action.user);
    }

    return {
      ...state,
      users: updatedUsers,
      usersViewStatus: ViewStatus.View
    };
  }),
  on(userUpdated, (state, action) => {
    const updatedUsers = [...state.users];

    // the user was updated successfully, replace the existing one
    const idx = updatedUsers.findIndex(usr => usr.userId === action.user.userId);
    if (idx >= 0) {
      updatedUsers.splice(idx, 1, action.user);
    }

    return {
      ...state,
      users: updatedUsers,
      usersViewStatus: ViewStatus.View
    };
  }),
  on(userDeleted, (state, action) => {
    const updatedUsers = [...state.users];

    // the user was deleted successfully, remove the existing one
    const idx = updatedUsers.findIndex(usr => usr.userId === action.user.userId);
    if (idx >= 0) {
      updatedUsers.splice(idx, 1);
    }

    return {
      ...state,
      users: updatedUsers
    };
  }),
  on(userCancel, (state) => {
    const updatedUsers = [...state.users];

    // the only thing we need to do (right now) for a cancel is remove the placeholder one
    // that may have been added
    const idx = updatedUsers.findIndex(usr => !usr.userId);
    if (idx >= 0) {
      updatedUsers.splice(idx, 1);
    }

    return {
      ...state,
      users: updatedUsers,
      usersViewStatus: ViewStatus.View
    };
  })
);

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
