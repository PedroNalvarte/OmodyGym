import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ignoreElements, catchError, delay, map, of, tap, throwError, Subject, Subscription, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../auth/auth.service';
import { User, UserWithToken } from '../../../../auth/model/user.interface';
import { IdMembership } from '../../../membresias/model/id-membership.interface';
import { registerTraining } from '../models/register-training.interface';
import { Metric } from '../models/metrics-interface';
@Injectable({ providedIn: 'root' })
export class MetricsService {

  //Prod
  public apiUrl: string = 'https://omodygym-backend.onrender.com';

  //Pruebas
  //public apiUrl: string = 'http://localhost:3001';



  constructor(private HttpClient: HttpClient, private authService: AuthService) {

  }




  getClientMetrics(client : number){
   const url = `${this.apiUrl}/getClientMetrics/${client}`

   return this.HttpClient.post<Metric[]>(url, {}).pipe(
    );
  }

 getLastPlan(){
    const url = `${this.apiUrl}/getLastPlan/`;

    var response = this.HttpClient.get<string>(url).pipe()
    
    return response;
 }

 registerMetric(metric : Metric): Observable<void>{
  
  const url = `${this.apiUrl}/insertMetric`;
  const request = this.HttpClient.post<boolean>(url, metric).pipe();
  return request.pipe(
     map(() => void 0)
  );
 }

}
