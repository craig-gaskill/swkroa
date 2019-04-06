import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CagstInputModule} from '@cagst/ngx-components';

import {SharedMaterialModule} from './shared-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,

    CagstInputModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,

    CagstInputModule
  ]
})
export class SharedModule { }
