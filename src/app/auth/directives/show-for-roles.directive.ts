import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription, distinctUntilChanged, map, tap } from 'rxjs';
import { Role } from '../model';
import { AuthService } from '../auth.service';

@Directive({
  selector: '[appShowForRoles]'
})
export class ShowForRolesDirective implements OnInit, OnDestroy {
  @Input ('appShowForRoles') allowedRoles?: Role[];

  private sub? : Subscription;
  constructor(
    private authService: AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>) { }
  ngOnInit(): void {
    this.sub = this.authService.user$
    .pipe(
      map((user) => Boolean(user && this.allowedRoles?.includes(user.role))),
      distinctUntilChanged(),
      tap((hasRole) =>
        hasRole
          ? this.viewContainerRef.createEmbeddedView(this.templateRef)
          : this.viewContainerRef.clear()
        )
    )
    .subscribe();
  }
  ngOnDestroy(): void {
      this.sub?.unsubscribe();
  }


}
