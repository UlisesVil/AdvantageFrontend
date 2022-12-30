import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UserRoutingModule } from './user-routing.module';
import { UserMainComponent } from './user-main/user-main.component';
import { MaterialModule } from "../../shared/material.module";


@NgModule({
  declarations: [UserMainComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    UserMainComponent
  ]
})
export class UserModule { }
