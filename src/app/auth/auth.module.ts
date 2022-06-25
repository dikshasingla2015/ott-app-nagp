import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';

import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const components = [
  LoginPageComponent,
  SignupPageComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    MatSnackBarModule
  ]
})
export class AuthModule { }
