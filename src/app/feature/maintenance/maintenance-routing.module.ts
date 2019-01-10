import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MaintenanceComponent} from './maintenance.component';
import {DictionariesComponent} from './dictionaries/dictionaries.component';
import {DocumentsComponent} from './documents/documents.component';
import {SystemComponent} from './system/system.component';
import {UsersComponent} from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceComponent,
    children: [
      {
        path: 'dictionaries',
        component: DictionariesComponent
      },
      {
        path: 'documents',
        component: DocumentsComponent
      },
      {
        path: 'system',
        component: SystemComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MaintenanceRoutingModule {
}
