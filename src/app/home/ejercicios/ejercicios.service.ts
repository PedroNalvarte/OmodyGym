import { Injectable } from '@angular/core';
import { Observable, Subscription, ignoreElements, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/model/user.interface';
import { Ejercicios } from './model/ejercicios.interface';
import { GrupoMuscular } from './model/grupoMuscular.interface';

@Injectable({ providedIn: 'root' })
export class EjerciciosService {

  //Prod
  public apiUrl: string = 'https://omodygym-backend.onrender.com';

  //Pruebas
  //public apiUrl: string = 'http://localhost:3001';

  constructor(private HttpClient: HttpClient, private authService: AuthService) {

  }

  public ejerciciosList: Ejercicios[] = [];
  public grupoMuscularList: GrupoMuscular[] = [];

  listEjercicios(): Observable<Ejercicios[]> {

    const url = `${this.apiUrl}/listEjercicios`;

    return this.HttpClient.post<Ejercicios[]>(url, {}).pipe(
      tap((result: Ejercicios[]) => {
        this.ejerciciosList = result;
      })
    );

  }

  listGrupoMuscular(): Observable<GrupoMuscular[]> {

    const url = `${this.apiUrl}/listGrupoMuscular`;

    return this.HttpClient.post<GrupoMuscular[]>(url, {}).pipe(
      tap((result: GrupoMuscular[]) => {
        this.grupoMuscularList = result;
      })
    );

  }

  registerEjercicio(personaRegistro: Ejercicios): Observable<never> {

    const url = `${this.apiUrl}/registerEjercicio`;

    return this.HttpClient.post<boolean>(url, personaRegistro).pipe(
      ignoreElements()
    );

  }



}







