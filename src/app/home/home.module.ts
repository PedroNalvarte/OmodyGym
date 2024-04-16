import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { PruebaComponent } from './prueba/pruebacomponent';

import { HomeRoutingModule } from './homerouting.module';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    PruebaComponent
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule { }
