import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ignoreElements, catchError, delay, map, of, tap, throwError, Subject, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { User, UserWithToken } from '../../auth/model/user.interface';
import { IdMembership } from '../membresias/model/id-membership.interface';
@Injectable({ providedIn: 'root' })
export class ClientsService {

  //Prod
  //public apiUrl: string = 'https://omodygym-backend.onrender.com';

  //Pruebas
  public apiUrl: string = 'http://localhost:3001';

 

  constructor(private HttpClient: HttpClient, private authService: AuthService) {

  }




/* registerMembership(membership: CreateMembership): Observable<never> {

    const url = `${this.apiUrl}/createMembership/${membership.detail}/${membership.cost}/${membership.name}/${membership.user}`;

    var response = this.HttpClient.post<string>(url, membership).pipe(
        ignoreElements()
    );

    return response;
  } */

  getClients(): Observable<any> {
    const url = `${this.apiUrl}/getClients`;

    return this.HttpClient.post<any>(url, {}).pipe(
    );
  }

  getClientsFiltered(input: IdMembership): Observable<any> {
    const url = `${this.apiUrl}/getClientsFiltered/${input.id}`;
    return this.HttpClient.post<any>(url, input).pipe(
    );
  }

 /*  updateStatus(id: IdMembership): Observable<never>{
    const url = `${this.apiUrl}/updateMembershipStatus/${id.id}`;
    console.log(url);
    var response = this.HttpClient.post<string>(url, id).pipe(
      ignoreElements()
  );

  return response;
  }
 */
}