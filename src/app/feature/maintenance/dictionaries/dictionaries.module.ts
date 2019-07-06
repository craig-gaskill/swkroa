import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';
import {DictionaryStoreModule} from './store/dictionary-store.module';

import {DictionariesComponent} from './dictionaries.component';
import {DictionaryDetailComponent} from './detail/dictionary-detail.component';
import {DictionaryValueComponent} from './detail/value/dictionary-value.component';
import {DictionariesManager} from './dictionaries.manager';

@NgModule({
  imports: [
    SharedModule,
    DictionaryStoreModule
  ],
  declarations: [
    DictionariesComponent,
    DictionaryDetailComponent,
    DictionaryValueComponent
  ],
  exports: [
    DictionariesComponent
  ],
  providers: [
    DictionariesManager
  ]
})
export class DictionariesModule { }
