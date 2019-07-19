import {User} from '../../../../core/user/user';

export enum LoadStatus {
  Loading,
  Loaded,
  NoContent,
  Error
}

export interface UserState {
  users: User[];
  usersLoadStatus: LoadStatus;
  usersLoadError: string;
}

export const initialUserState: UserState = {
  users: undefined,
  usersLoadStatus: undefined,
  usersLoadError: undefined
};
