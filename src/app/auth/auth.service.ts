import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserWithToken } from './model/user.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginCredentials } from './model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public apiUrl: string = 'http://localhost:3000';

  private user = new BehaviorSubject<UserWithToken | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  constructor(private htppClientL: HttpClient, private router: Router) {

    //TODO: llamada al metodo para cargar datos del usuario al local storage
  }

  login(credentials: LoginCredentials): Observable<never> {



  }

}
