import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {MaintenanceRoutingModule} from './maintenance-routing.module';
import {DictionariesModule} from './dictionaries/dictionaries.module';
import {DocumentsModule} from './documents/documents.module';
import {SystemModule} from './system/system.module';
import {UsersModule} from './users/users.module';

import {MaintenanceComponent} from './maintenance.component';

@NgModule({
  imports: [
    SharedModule,
    MaintenanceRoutingModule,
    DictionariesModule,
    DocumentsModule,
    SystemModule,
    UsersModule
  ],
  declarations: [
    MaintenanceComponent
  ]
})
export class MaintenanceModule {
}
