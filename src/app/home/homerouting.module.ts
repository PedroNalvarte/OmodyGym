import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { PruebaComponent } from './prueba/pruebacomponent';


const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'prueba',
        component: PruebaComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
