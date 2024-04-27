import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginCredentials } from '../model/login-credentials.interface';
import { EMPTY, Subscription, catchError, finalize, pipe, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { bootstrap } from 'ngx-bootstrap-icons';
import { Modal } from 'bootstrap';



@Component({
  selector: 'login-main-page',
  templateUrl: './login-main-page.component.html',
  styleUrl: './login-main-page.component.css'
})
export class LoginPageComponent implements OnInit {

  private triggerHandleUnauthorized: Subscription;
  private triggerOpenPasswordReset: Subscription;

  ngOnInit(): void {
    this.triggerHandleUnauthorized = this.authService.getTriggerHandleUnauthorizedMethodObservable().subscribe(() => {
      this.handleUnauthorized();
    });

    this.triggerOpenPasswordReset = this.authService.getTriggerOpenPasswordResetMethodObservable().subscribe((accion: string) => {
      this.openPasswordReset(accion);
    });
  }


  public processingRequest: boolean = false;
  public invalidCredentials: boolean = false;

  public credentials: LoginCredentials = {
    username: '',
    password: ''
  }

  //Password reset variable
  public resetPassword: string = '';
  public resetPassword2: string = '';
  public resetErrorMensaje: string = '';
  public invalidResetPassword: boolean = false;
  public processingPasswordResetRequest: boolean = false;
  public successReset: boolean = false;
  public modalHide: boolean = false;

  constructor(public authService: AuthService, private cdr: ChangeDetectorRef) {

    this.triggerHandleUnauthorized = new Subscription();
    this.triggerOpenPasswordReset = new Subscription();
  }

  login() {
    this.invalidCredentials = false;
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

  openPasswordReset(accion: string) {

    console.log(accion);

    this.invalidResetPassword = false;
    this.resetPassword = '';
    this.resetPassword2 = '';

    const modalElement = document.getElementById('myModal') as HTMLElement;
    const myModal = new Modal(modalElement);

    if (accion == 'abrir') {
      myModal.show();
    } else if (accion == 'cerrar') {

      this.successReset = true;
      this.processingPasswordResetRequest = false;

      this.credentials.password = '';

    }




  }

  passwordReset() {

    this.invalidResetPassword = false;

    if (this.resetPassword !== this.resetPassword2) {

      this.invalidResetPassword = true;
      this.resetErrorMensaje = 'Las contraseñas deben coincidir';

    } else if (this.credentials.password == this.resetPassword) {

      this.invalidResetPassword = true;
      this.resetErrorMensaje = 'Las contraseña no puede ser igual a la actual.';

    } else {

      this.processingPasswordResetRequest = true;

      this.authService
        .resetPassword(this.resetPassword, this.credentials.username)
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


  }

  cerrarModal() {
    this.modalHide = true;
  }









}


