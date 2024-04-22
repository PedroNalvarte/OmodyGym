import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes, CanLoad } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { CountriesModule } from './countries/countries.module';
import { LoginPageComponent } from './auth/login/login-main-page.component';
import { isLoggedInGuard } from './auth/guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    canLoad: [isLoggedInGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  },

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
