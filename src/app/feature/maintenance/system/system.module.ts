import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';
import {SystemComponent} from './system.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SystemComponent
  ],
  exports: [
    SystemComponent
  ]
})
export class SystemModule { }
