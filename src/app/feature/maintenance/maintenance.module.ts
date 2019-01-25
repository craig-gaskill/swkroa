import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {MaintenanceRoutingModule} from './maintenance-routing.module';
import {DictionariesModule} from './dictionaries/dictionaries.module';

import {MaintenanceComponent} from './maintenance.component';
import {DocumentsComponent} from './documents/documents.component';
import {SystemComponent} from './system/system.component';
import {UsersComponent} from './users/users.component';

@NgModule({
  imports: [
    SharedModule,
    MaintenanceRoutingModule,
    DictionariesModule
  ],
  declarations: [
    MaintenanceComponent,
    DocumentsComponent,
    SystemComponent,
    UsersComponent
  ]
})
export class MaintenanceModule {
}
