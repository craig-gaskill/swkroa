import {createAction, props} from '@ngrx/store';

import {User} from '../../../../core/user/user';

export const loadUsers          = createAction('[Users] Load');
export const loadUsersSucceeded = createAction('[Users] Load Succeeded', props<{users: User[]}>());
export const loadUsersFailed    = createAction('[Users] Load Failed', props<{error: string}>());
export const resetUsers         = createAction('[Users] Reset');

export const userAdd    = createAction('[User] Add');
export const userEdit   = createAction('[User] Edit');
export const userDelete = createAction('[User] Delete');
export const userCancel = createAction('[User] Cancel');

export const userSave         = createAction('[User] Save', props<{user: User}>());
export const userCreated      = createAction('[User] Created', props<{user: User}>());
export const userUpdated      = createAction('[User] Updated', props<{user: User}>());
export const userDeleted      = createAction('[User] Deleted', props<{user: User}>());
export const userSaveFailed   = createAction('[User] Save Failed', props<{error: string}>());
export const userDeleteFailed = createAction('[User] Delete Failed', props<{error: string}>());
