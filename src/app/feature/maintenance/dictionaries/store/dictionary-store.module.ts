import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {dictionaryReducer} from './dictionary-store.reducer';
import {DictionaryStoreEffects} from './dictionary-store.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('dictionaries', dictionaryReducer),
    EffectsModule.forFeature([DictionaryStoreEffects])
  ],
  providers: [
    DictionaryStoreEffects
  ]
})
export class DictionaryStoreModule { }
