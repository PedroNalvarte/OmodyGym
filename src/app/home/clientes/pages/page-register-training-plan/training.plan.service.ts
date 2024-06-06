import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ignoreElements, catchError, delay, map, of, tap, throwError, Subject, Subscription, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../auth/auth.service';
import { User, UserWithToken } from '../../../../auth/model/user.interface';
import { IdMembership } from '../../../membresias/model/id-membership.interface';
import { registerTraining } from '../models/register-training.interface';
@Injectable({ providedIn: 'root' })
export class TrainingPlanService {

  //Prod
  public apiUrl: string = 'https://omodygym-backend.onrender.com';

  //Pruebas
  //public apiUrl: string = 'http://localhost:3001';



  constructor(private HttpClient: HttpClient, private authService: AuthService) {

  }






 getLastPlan(){
    const url = `${this.apiUrl}/getLastPlan/`;

    var response = this.HttpClient.get<string>(url).pipe()
    
    return response;
 }

   registerEjercicio(rows: registerTraining[]): Observable<void> {

      const url = `${this.apiUrl}/insertTrainingPlan`;
      const requests: Observable<boolean>[] = [];
      rows.forEach(row => {
         const request = this.HttpClient.post<boolean>(url, row).pipe(
         );
         requests.push(request);
      });

      return forkJoin(requests).pipe(
         map(() => void 0)
      );
   }

   deleteLastPlan(id : any){
      const url = `${this.apiUrl}/deleteLastPlan/${id}`;

      var response = this.HttpClient.post<string>(url, {id}).pipe()
      return response;
   }
}
