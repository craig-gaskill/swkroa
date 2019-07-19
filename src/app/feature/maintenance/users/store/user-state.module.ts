import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {userReducer} from './user-store.reducer';
import {UserStoreEffects} from './user-store.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('userStore', userReducer),
    EffectsModule.forFeature([UserStoreEffects])
  ],
  providers: [
    UserStoreEffects
  ]
})
export class UserStateModule { }
