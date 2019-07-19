import {createAction, props} from '@ngrx/store';

import {User} from '../../../../core/user/user';

export const loadUsers          = createAction('[Users] Load');
export const loadUsersSucceeded = createAction('[Users] Load Succeeded', props<{users: User[]}>());
export const loadUsersFailed    = createAction('[Users] Load Failed', props<{error: string}>());
