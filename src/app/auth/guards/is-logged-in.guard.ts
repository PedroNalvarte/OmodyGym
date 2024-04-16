import { CanActivateFn, CanLoad, CanMatchFn, UrlTree, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class isLoggedInGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn$.pipe(
      map((isLoggedIn) => isLoggedIn || this.router.createUrlTree(['/login']))
    );
  }
};
