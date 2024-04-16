import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginCredentials } from '../model/login-credentials.interface';
import { EMPTY, Subscription, catchError, finalize, pipe, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login-main-page',
  templateUrl: './login-main-page.component.html',
  styleUrl: './login-main-page.component.css'
})
export class LoginPageComponent implements OnInit {

  private triggerSubscription: Subscription;

  ngOnInit(): void {
    this.triggerSubscription = this.authService.getTriggerComponentMethodObservable().subscribe(() => {
      this.handleUnauthorized();
    });
  }

  public processingRequest: boolean = false;

  public invalidCredentials: boolean = false;

  public credentials: LoginCredentials = {
    username: '',
    password: ''

  }

  constructor(public authService: AuthService, private cdr: ChangeDetectorRef) {

    this.triggerSubscription = new Subscription();
  }

  login() {

    this.processingRequest = true;

    this.authService
      .login(this.credentials)
      .pipe(
        tap((result) => console.log('Resultado antes de catchError:', result)),
        finalize(() => (this.processingRequest = false)),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.handleUnauthorized();
            return EMPTY;
          }

          throw error;
        })
      )
      .subscribe();


  }


  handleUnauthorized() {
    this.invalidCredentials = true;
    this.cdr.markForCheck();
  }


}
