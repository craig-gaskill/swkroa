import {LoadStatus, ViewStatus} from '../../../../app-store.state';
import {User} from '../../../../core/user/user';

export interface UserState {
  users: User[];
  usersLoadStatus: LoadStatus;
  usersLoadError: string;
  usersViewStatus: ViewStatus;
}

export const initialUserState: UserState = {
  users: undefined,
  usersLoadStatus: undefined,
  usersLoadError: undefined,
  usersViewStatus: ViewStatus.View
};
