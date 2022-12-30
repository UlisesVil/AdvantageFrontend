import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from "../../shared/material.module";

import { UserSessionRoutingModule } from './user-session-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from  '../../interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    UserSessionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    CookieService,{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi:true
    }
  ],
})
export class UserSessionModule { }
