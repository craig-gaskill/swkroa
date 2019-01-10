import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {MaintenanceRoutingModule} from './maintenance-routing.module';
import {MaintenanceComponent} from './maintenance.component';
import {DictionariesComponent} from './dictionaries/dictionaries.component';
import {DocumentsComponent} from './documents/documents.component';
import {SystemComponent} from './system/system.component';
import {UsersComponent} from './users/users.component';

@NgModule({
  imports: [
    SharedModule,
    MaintenanceRoutingModule
  ],
  declarations: [
    MaintenanceComponent,
    DictionariesComponent,
    DocumentsComponent,
    SystemComponent,
    UsersComponent
  ]
})
export class MaintenanceModule {
}
