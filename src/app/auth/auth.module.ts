import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login/login-main-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ShowForRolesDirective } from './directives/show-for-roles.directive';



@NgModule({
  declarations: [
    LoginPageComponent,
    ShowForRolesDirective

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
    
  ],
  exports: [
    ShowForRolesDirective
  ]
})
export class AuthModule { }
