import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {DictionariesComponent} from './dictionaries.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DictionariesComponent
  ],
  exports: [
    DictionariesComponent
  ]
})
export class DictionariesModule { }
