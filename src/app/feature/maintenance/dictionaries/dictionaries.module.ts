import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {SharedModule} from '../../../shared/shared.module';

import {DictionariesComponent} from './dictionaries.component';
import {DictionaryDetailComponent} from './dictionary-detail.component';
import {DictionaryValueComponent} from './value/dictionary-value.component';
import {dictionaryReducer} from './store/dictionary-store.reducer';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('dictionaries', dictionaryReducer)
  ],
  declarations: [
    DictionariesComponent,
    DictionaryDetailComponent,
    DictionaryValueComponent
  ],
  exports: [
    DictionariesComponent
  ]
})
export class DictionariesModule { }
