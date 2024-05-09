import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ignoreElements, catchError, delay, map, of, tap, throwError, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { User, UserWithToken } from '../../auth/model/user.interface';
import { IdMembership } from '../membresias/model/id-membership.interface';
import { DetailClient } from './model/detail-client.interface';

@Injectable({ providedIn: 'root' })
export class ClientsService {

  //Prod
  public apiUrl: string = 'https://omodygym-backend.onrender.com';

  //Pruebas
  //public apiUrl: string = 'http://localhost:3001';



  constructor(private HttpClient: HttpClient, private authService: AuthService) {

  }






  getClients(): Observable<any> {
    const url = `${this.apiUrl}/getClients`;

    return this.HttpClient.post<any>(url, {}).pipe(
    );
  }

  registerCliente(client: DetailClient): Observable<string> {

    const url = `${this.apiUrl}/createClient/${client.nombre}/${client.apellido1}/${client.apellido2}/${client.sede}/${client.membresia}/${client.dni}/${client.fechaNacimiento}/${client.telefono}/${client.usuario}`;

    var response = this.HttpClient.post<string>(url, client).pipe(
      tap(response => {
        console.log('Respuesta del servidor:', response);
      })
    );

    return response;
  }
}
