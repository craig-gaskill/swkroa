import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';
import {UsersComponent} from './users.component';
import {UserStateModule} from './store/user-state.module';
import {UsersManager} from './users.manager';
import {UserDetailComponent} from './detail/user-detail.component';

@NgModule({
  imports: [
    SharedModule,
    UserStateModule
  ],
  declarations: [
    UsersComponent,
    UserDetailComponent
  ],
  exports: [
    UsersComponent
  ],
  providers: [
    UsersManager
  ]
})
export class UsersModule { }
