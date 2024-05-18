import { Injectable } from '@angular/core';
import { Observable, Subscription, ignoreElements, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/model/user.interface';
import { MiPlan } from './model/miPlan.interface';

@Injectable({ providedIn: 'root' })
export class MiPlanService {

  //Prod
  public apiUrl: string = 'https://omodygym-backend.onrender.com';

  //Pruebas
  //public apiUrl: string = 'http://localhost:3001';

  constructor(private HttpClient: HttpClient) { }

  public miPlanList: MiPlan[] = [

  ];

  listMiPlan(id: string): Observable<MiPlan[]> {

    const url = `${this.apiUrl}/listMiPlan/${id}`;

    return this.HttpClient.post<MiPlan[]>(url, {}).pipe(
      tap((result: MiPlan[]) => {
        this.miPlanList = result; // Almacenar el resultado en sedeList
      })
    );

  }












}







