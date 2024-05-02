import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login/login-main-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginPageComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule

  ],
  exports: [
  ]
})
export class AuthModule { }
