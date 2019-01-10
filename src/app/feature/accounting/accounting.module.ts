import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {AccountingComponent} from './accounting.component';
import {AccountingRoutingModule} from './accounting-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AccountingRoutingModule
  ],
  declarations: [
    AccountingComponent
  ]
})
export class AccountingModule {
}
