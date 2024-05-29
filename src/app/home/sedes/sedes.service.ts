import { Injectable } from '@angular/core';
import { Sede } from './model/sedes.interface';
import { Observable, Subscription, ignoreElements, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/model/user.interface';

@Injectable({ providedIn: 'root' })
export class SedesService {

  //Prod
  public apiUrl: string = 'https://omodygym-backend.onrender.com';

  //Pruebas
  //public apiUrl: string = 'http://localhost:3001';

  dni: string = '';
  private subscription: Subscription;

  constructor(private HttpClient: HttpClient, private authService: AuthService) {

    this.subscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.dni = user.dni; // Asegúrate de que la interfaz UserWithToken tenga definida la propiedad dni
      } else {
        this.dni = 'No disponible';
      }
    });

  }

  public sedeList: Sede[] = [

  ];

  registerSede(sede: Sede): Observable<never> {

    const url = `${this.apiUrl}/registerSede/${this.dni}`;

    return this.HttpClient.post<boolean>(url, sede).pipe(

      ignoreElements()
    );

  }

  listSede(): Observable<Sede[]> {

    const url = `${this.apiUrl}/listSedes`;

    return this.HttpClient.post<Sede[]>(url, {}).pipe(
      tap((result: Sede[]) => {
        this.sedeList = result; // Almacenar el resultado en sedeList
      })
    );
  }

  updateStatus(id: string): Observable<never> {
    const url = `${this.apiUrl}/updateSiteStatus/${id}`;
    console.log(url);
    var response = this.HttpClient.post<string>(url, id).pipe(
      ignoreElements()
    );

    return response;
  }












}







