import { Injectable } from '@angular/core';
import { Observable, Subscription, ignoreElements, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/model/user.interface';
import { MiPerfil } from './model/miPerfil.interface';


@Injectable({ providedIn: 'root' })
export class PerfilService {

  //Prod
  public apiUrl: string = 'https://omodygym-backend.onrender.com';

  //Pruebas
  //public apiUrl: string = 'http://localhost:3001';

  constructor(private HttpClient: HttpClient, private authService: AuthService) {

  }

  public miPerfil: MiPerfil[] = [];

  listMiPerfil(dni: string): Observable<MiPerfil[]> {

    const url = `${this.apiUrl}/getProfileData/${dni}`;

    return this.HttpClient.post<MiPerfil[]>(url, {}).pipe(
      tap((result: MiPerfil[]) => {
        this.miPerfil = result;
      })
    );

  }

}







