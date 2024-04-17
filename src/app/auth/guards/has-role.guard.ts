import { CanActivateFn, CanLoad, CanMatchFn, UrlTree, Router, UrlSegment, Route, CanActivate, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class hasRoleGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService,private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasRole(route).pipe(
      map((hasRole) => {
        if(!hasRole){

          this.router.navigate(['/inicio']);
          return false;
        }
        return true;
      })
    );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.hasRole(route).pipe(
      map((hasRole) => {
        if(!hasRole){
          this.router.navigate(['/inicio']);
          return false;
        }
        return true;
      })
    );
  }

  private hasRole(route: Route | ActivatedRouteSnapshot) {
    const allowedRoles = route.data?.['allowedRoles'];
    return this.authService.user$.pipe(
      map((user) => Boolean(user && allowedRoles.includes(user.role))),
      tap((hasRole) => hasRole === false && alert('Acceso Denegado'))
    );
  }
};
