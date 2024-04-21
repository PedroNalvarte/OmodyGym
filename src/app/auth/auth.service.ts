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

  public apiUrl: string = 'https://omodygym-backend.onrender.com';

  private user = new BehaviorSubject<UserWithToken | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  //metodo

  private triggerComponentMethodSubject = new Subject<void>();

  triggerComponentMethod() {
    this.triggerComponentMethodSubject.next();
  }

  getTriggerComponentMethodObservable() {
    return this.triggerComponentMethodSubject.asObservable();
  }
  //fgin meopto


  constructor(private HttpClient: HttpClient, private router: Router) {
    this.loadUserFromLocalStorage();
  }

  login(credentials: LoginCredentials): Observable<never> {
    const url = `${this.apiUrl}/login/${credentials.username}/${credentials.password}`;

    return this.HttpClient.post<string>(url, credentials).pipe(
      tap((userToken) => {
        if (userToken === 'null') {
          //console.log('es null');
          this.triggerComponentMethod();
        } else {
          //console.log('no es null')
          this.saveTokenToLocalStore(userToken);
          this.pushNewUser(userToken);
          this.redirectToDashboard();
        }
      }),

      ignoreElements()

    );


  }
  logout(): void{
    this.removeUserFromLocalStorage();
    this.user.next(null);
    this.router.navigateByUrl('/login');
  }

  private removeUserFromLocalStorage(): void{
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
    this.router.navigateByUrl('/prueba');
  }

}




// login(credentials: LoginCredentials): Observable<String> {

//   const url = `${this.apiUrl}/login/${credentials.username}/${credentials.password}`
//   return this.getRolsRequest(url)
//     .pipe(
//       tap(result => console.log(result))
//     )

// }

// private getRolsRequest(url: string): Observable<String> {
//   return this.htpp.get<String>(url)
//     .pipe(
//       delay(1000)
//     );
// }







