import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';
import {DocumentsComponent} from './documents.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DocumentsComponent
  ],
  exports: [
    DocumentsComponent
  ]
})
export class DocumentsModule { }
