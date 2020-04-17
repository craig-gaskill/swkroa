import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CgtConfirmationModule, CgtInputModule} from '@cagst/ngx-components';
import {CgtDictionaryModule} from '@cagst/ngx-dictionary';

import {SharedMaterialModule} from './shared-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,

    CgtConfirmationModule,
    CgtDictionaryModule,
    CgtInputModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,

    CgtConfirmationModule,
    CgtDictionaryModule,
    CgtInputModule
  ],
  providers: [
  ]
})
export class SharedModule { }
