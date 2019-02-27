import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';
import {DictionariesComponent} from './dictionaries.component';
import {DictionaryDetailComponent} from './dictionary-detail.component';
import {DictionaryValueComponent} from './value/dictionary-value.component';

@NgModule({
  imports: [
    SharedModule
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
