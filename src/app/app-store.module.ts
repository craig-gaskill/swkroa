import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {environment} from '../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'swkroa',
      maxAge: 25,                       // retain last 25 states
      logOnly: environment.production   // restrict extension to log-only mode
    })
  ]
})
export class AppStoreModule { }
