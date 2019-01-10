import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {MembershipsRoutingModule} from './memberships-routing.module';
import {MembershipsComponent} from './memberships.component';

@NgModule({
  imports: [
    SharedModule,
    MembershipsRoutingModule
  ],
  declarations: [
    MembershipsComponent
  ]
})
export class MembershipsModule {
}
