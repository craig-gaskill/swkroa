
import {UserState} from './user-store.state';
import {User} from '../../../../core/user/user';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LoadStatus, ViewStatus} from '../../../../app-store.state';

const getAllUsers        = (state: UserState): User[] => state.users;
const getUsersLoadStatus = (state: UserState): LoadStatus => state.usersLoadStatus;
const getUsersLoadError  = (state: UserState): string => state.usersLoadError;
const getUsersViewStatus = (state: UserState): ViewStatus => state.usersViewStatus;

const selectUserState = createFeatureSelector<UserState>('userStore');

export const selectAllUsers  = createSelector(selectUserState, getAllUsers);
export const selectUsersLoadStatus = createSelector(selectUserState, getUsersLoadStatus);
export const selectUsersLoadError  = createSelector(selectUserState, getUsersLoadError);
export const selectUsersViewStatus = createSelector(selectUserState, getUsersViewStatus);