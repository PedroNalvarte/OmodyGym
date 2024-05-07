import { Injectable } from '@angular/core';
import { Observable, Subscription, ignoreElements, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/model/user.interface';
import { PersonaColaborador } from './model/personaColaborador.interface';

@Injectable({ providedIn: 'root' })
export class ColaboradoresService {

  //Prod
  //public apiUrl: string = 'https://omodygym-backend.onrender.com';

  //Pruebas
  public apiUrl: string = 'http://localhost:3001';

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

  public colaboradoresList: PersonaColaborador[] = [

  ];

  // registerSede(sede: Sede): Observable<never> {

  //   const url = `${this.apiUrl}/registerSede/${this.dni}`;

  //   return this.HttpClient.post<boolean>(url, sede).pipe(

  //     ignoreElements()
  //   );

  // }

  listColaboradores(): Observable<PersonaColaborador[]> {

    const url = `${this.apiUrl}/listColaboradores`;

    return this.HttpClient.post<PersonaColaborador[]>(url, {}).pipe(
      tap((result: PersonaColaborador[]) => {
        this.colaboradoresList = result; // Almacenar el resultado en sedeList
      })
    );

  }

  registerColaboradores(personaRegistro: PersonaColaborador): Observable<never> {

    const url = `${this.apiUrl}/registerColaborador`;

    return this.HttpClient.post<boolean>(url, personaRegistro).pipe(
      ignoreElements()
    );

  }












}







