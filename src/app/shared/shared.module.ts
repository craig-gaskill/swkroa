import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CgtConfirmationModule, CgtInputModule} from '@cagst/ngx-components';

import {SharedMaterialModule} from './shared-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,

    CgtConfirmationModule,
    CgtInputModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,

    CgtConfirmationModule,
    CgtInputModule
  ]
})
export class SharedModule { }
