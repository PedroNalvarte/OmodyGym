import { Injectable } from '@angular/core';
import { CreateMembership } from './model/create-membership.interface';
import { BehaviorSubject, Observable, ignoreElements, catchError, delay, map, of, tap, throwError, Subject, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { User, UserWithToken } from '../../auth/model/user.interface';

@Injectable({ providedIn: 'root' })
export class MembresiasService {

  //Prod
  //public apiUrl: string = 'https://omodygym-backend.onrender.com';

  //Pruebas
  public apiUrl: string = 'http://localhost:3001';

 

  constructor(private HttpClient: HttpClient, private authService: AuthService) {

  }




registerMembership(membership: CreateMembership): Observable<never> {

    const url = `${this.apiUrl}/createMembership/${membership.detail}/${membership.cost}/${membership.name}/${membership.user}`;

    var response = this.HttpClient.post<string>(url, membership).pipe(
        ignoreElements()
    );

    return response;
  }

}