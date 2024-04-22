import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes, CanLoad } from '@angular/router';
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
