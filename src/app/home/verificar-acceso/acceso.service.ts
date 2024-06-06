import { Injectable } from '@angular/core';
import { Observable, Subscription, ignoreElements, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/model/user.interface';
import { Acceso } from './model/acceso.interface';

@Injectable({ providedIn: 'root' })
export class AccesoService {

  //Prod
  //public apiUrl: string = 'https://omodygym-backend.onrender.com';

  //Pruebas
  public apiUrl: string = 'http://localhost:3001';

  constructor(private HttpClient: HttpClient) { }

  public AccesoList: Acceso[] = [

  ];

  listAcceso(dni: string): Observable<Acceso[]> {

    const url = `${this.apiUrl}/verifyAccess/${dni}`;

    return this.HttpClient.post<Acceso[]>(url, {}).pipe(
      tap((result: Acceso[]) => {
        this.AccesoList = result; // Almacenar el resultado en list
      })
    );

  }












}







