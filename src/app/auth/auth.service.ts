import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ignoreElements, catchError, delay, map, of, tap, throwError, Subject } from 'rxjs';
import { User, UserWithToken } from './model/user.interface';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginCredentials } from './model';
import { HttpStatusCode } from '@angular/common/http';

const USER_LOCAL_STORAGE_KEY = 'userData';
@Injectable({ providedIn: 'root' })
export class AuthService {

  //Prod
  public apiUrl: string = 'https://omodygym-backend.onrender.com';

  //Pruebas
  //public apiUrl: string = 'http://localhost:3001';

  private user = new BehaviorSubject<UserWithToken | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  //metodo de html

  private triggerHandleUnauthorized = new Subject<void>();
  private triggerOpenPasswordReset = new Subject<string>();

  triggerHandleUnauthorizedMethod() {
    this.triggerHandleUnauthorized.next();
  }

  triggertriggerOpenPasswordReset(accion: string) {
    this.triggerOpenPasswordReset.next(accion);
  }

  getTriggerHandleUnauthorizedMethodObservable() {
    return this.triggerHandleUnauthorized.asObservable();
  }

  getTriggerOpenPasswordResetMethodObservable() {
    return this.triggerOpenPasswordReset.asObservable();
  }
  //fin metodo de html


  constructor(private HttpClient: HttpClient, private router: Router) {
    this.loadUserFromLocalStorage();
  }

  login(credentials: LoginCredentials): Observable<never> {
    const url = `${this.apiUrl}/login/${credentials.username}/${credentials.password}`;

    return this.HttpClient.post<string>(url, credentials).pipe(
      tap((userToken) => {
        if (userToken === 'null') {
          //console.log('es null');
          this.triggerHandleUnauthorizedMethod();
        } else {
          //console.log('no es null')
          if (credentials.username !== credentials.password) {
            //console.log("Son diferentes");
            this.saveTokenToLocalStore(userToken);
            this.pushNewUser(userToken);
            this.redirectToDashboard();
          } else {
            //console.log("Son iguales");
            this.triggertriggerOpenPasswordReset('abrir');
          }

        }
      }),

      ignoreElements()

    );

  }

  logout(): void {
    this.removeUserFromLocalStorage();
    this.user.next(null);
    this.router.navigateByUrl('/login');
  }

  resetPassword(resetPassword: string, user: string): Observable<never> {

    const url = `${this.apiUrl}/reset/${user}/${resetPassword}`;

    return this.HttpClient.post<boolean>(url, user).pipe(
      tap((res) => {
        if (res == true) {

          this.triggertriggerOpenPasswordReset('cerrar');

        }
      }),
      ignoreElements()

    );

  }




  private removeUserFromLocalStorage(): void {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  }


  //-------------------funciones de local storage-------------------
  private loadUserFromLocalStorage(): void {
    const userFromLocal = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

    userFromLocal && this.pushNewUser(userFromLocal);
  }

  private saveTokenToLocalStore(userToken: string): void {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, userToken);
  }


  private pushNewUser(token: string) {
    this.user.next(this.decodeToken(token));
  }

  private decodeToken(userToken: string): UserWithToken {
    const userInfo = JSON.parse(userToken) as User;

    return { ...userInfo, token: userToken };
  }

  private redirectToDashboard(): void {
    this.router.navigateByUrl('/inicio');
  }

}







