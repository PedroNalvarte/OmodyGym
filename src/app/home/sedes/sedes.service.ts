import { Injectable } from '@angular/core';
import { Sede } from './model/sedes.interface';
import { Observable, Subscription, ignoreElements, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/model/user.interface';

@Injectable({ providedIn: 'root' })
export class SedesService {

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





  public sedeList: Sede[] = [
    {
      idSede: 1,
      nombreSede: 'Santa Anita',
      abreviacion: 'SA',
      direccion: 'Av. dasd #322',
      fechaCreacion: new Date(2024, 11, 23),
      fechaModificacion: new Date(2024, 11, 23),
      estado: 'A',
      usuarioModificacion: 1,
    }
  ];

  registerSede(sede: Sede): Observable<never> {

    const url = `${this.apiUrl}/registerSede/${this.dni}`;

    return this.HttpClient.post<boolean>(url, sede).pipe(

      ignoreElements()
    );

  }












}







