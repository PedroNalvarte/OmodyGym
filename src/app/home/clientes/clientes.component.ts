import { Component } from '@angular/core';
import { ClientsService } from './clientes.service';
import { AuthService } from '../../auth/auth.service';
import { DetailClient } from './model/detail-client.interface';
import { DatePipe } from '@angular/common';
import { IdMembership } from '../membresias/model/id-membership.interface';
import { ClientFilterPipe } from './pipes/client-filter.pipe';
import { ClientesListComponent } from './pages/page-list/clientes.list.component';
@Component({
  selector: 'clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})


export class ClientesComponent {
  public onRegisterRecepcionista = false;
  public onListRecepcionista = false;
  public onListTrainer = false;
  public onRegisterTrainer = false;
  public onRegisterPlan = false;
  selectedClient : any;
  currentUserRole : any;
  constructor(private authService : AuthService, private clientService : ClientsService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.currentUserRole = user?.role;
    });

    if(this.currentUserRole == "Entrenador"){
      this.onListTrainer = true;
    }
    else{
      this.onListRecepcionista = true;
    }
   }
  goToRegister(){
    if(this.currentUserRole == "Entrenador"){
      this.onListTrainer = false;
      this.onRegisterTrainer = true;
    }
    else{
      this.onRegisterRecepcionista = true;
      this.onListRecepcionista = false;
    }
    
  }

  goToList(){
    if(this.currentUserRole == "Entrenador"){
      this.onListTrainer = true;
      this.onRegisterTrainer = false;
      this.onRegisterPlan = false;
    }
    else{
      this.onRegisterRecepcionista = false;
      this.onListRecepcionista = true;
      this.onRegisterPlan = false;
    }
  }

  goToRegisterPlan(eventData: any){
    this.selectedClient = eventData;
    this.onRegisterPlan = true;
    this.onRegisterTrainer = false;
    this.onListTrainer = false;
  }
}
