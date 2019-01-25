import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';
import {DictionariesComponent} from './dictionaries.component';
import {DictionaryDetailComponent} from './dictionary-detail.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DictionariesComponent,
    DictionaryDetailComponent
  ],
  exports: [
    DictionariesComponent
  ]
})
export class DictionariesModule { }
