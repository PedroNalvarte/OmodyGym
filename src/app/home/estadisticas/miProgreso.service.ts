import { Injectable } from '@angular/core';
import { Observable, Subscription, ignoreElements, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/model/user.interface';
import { MisMetricas } from './model/misMetricas.interface';


@Injectable({ providedIn: 'root' })
export class MiProgresoService {

  //Prod
  //public apiUrl: string = 'https://omodygym-backend.onrender.com';

  //Pruebas
  public apiUrl: string = 'http://localhost:3001';

  constructor(private HttpClient: HttpClient, private authService: AuthService) {

  }

  public miProgreso: MisMetricas[] = [];

  listMiPerfil(dni: string): Observable<MisMetricas[]> {

    const url = `${this.apiUrl}/listMyMetrics/${dni}`;

    return this.HttpClient.post<MisMetricas[]>(url, {}).pipe(
      tap((result: MisMetricas[]) => {
        this.miProgreso = result;
      })
    );

  }

}







