import { Component } from '@angular/core';
import { ClientsService } from './clientes.service';
import { AuthService } from '../../auth/auth.service';
import { DetailClient } from './model/detail-client.interface';
import { DatePipe } from '@angular/common';
import { IdMembership } from '../membresias/model/id-membership.interface';
@Component({
  selector: 'clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent {
  clients: any[] = [];
  datePipe: DatePipe = new DatePipe('en-US');
  public selectedClient : DetailClient = {
    id: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    edad: '',
    telefono: '',
    sede: '', 
    membresia: '',
    fechafin: ''
  }
  public clientSelected = false;
  inputContainer: IdMembership = {
    id: ''
  };
  constructor(private authService : AuthService, private clientService : ClientsService) { }

  ngOnInit() {
    this.GetClients();
    this.clientSelected = false;
   }

   GetClients(){
    this.clientService.getClients().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.log('Error al cargar los clientes:', error);
      }
    );

  }

  onSelect(client : DetailClient){
    this.selectedClient = client;
    var truedate = this.datePipe.transform(this.selectedClient.fechafin, 'yyyy-MM-dd');
    if(truedate){
      this.selectedClient.fechafin = truedate;
    }
    this.clientSelected = true;
  }

  realizarBusqueda(input : any){
     if(!input.value.trim()){
          input.placeholder = "Ingrese información antes de presionar enter"
     }
     else{
      this.inputContainer.id = input;
      this.clientService.getClientsFiltered(this.inputContainer).subscribe(
        (data) => {
          this.clients = data;
          console.log(data);
        },
        (error) => {
          console.log('Error al cargar los clientes', error);
        }
      )
     }
  }

}
