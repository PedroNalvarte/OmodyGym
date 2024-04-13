import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { CountriesModule } from './countries/countries.module';
import { LoginPageComponent } from './auth/login/login-main-page.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePageComponent
  // },
  {
    path: 'login',
    component: LoginPageComponent,
  }
  // ,
  // {
  //   path: 'contact',
  //   component: ContactPageComponent
  // },
  // {
  //   path: 'countries',
  //   loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
  // },
  // {
  //   path: '**',
  //   redirectTo: 'countries'
  // }

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
