import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticationGuard} from './guard/authentication.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    AuthenticationGuard
  ]
})
export class SecurityModule { }
