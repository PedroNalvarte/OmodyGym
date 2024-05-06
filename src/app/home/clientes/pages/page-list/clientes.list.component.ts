import { Component, Output, EventEmitter } from '@angular/core';
import { ClientsService } from '../../clientes.service';
import { AuthService } from '../../../../auth/auth.service';
import { DetailClient } from '../../model/detail-client.interface';
import { DatePipe } from '@angular/common';
import { IdMembership } from '../../../membresias/model/id-membership.interface';
import { ClientFilterPipe } from '../../pipes/client-filter.pipe';
@Component({
  selector: 'clientes-list',
  templateUrl: './clientes.list.component.html',
  styleUrls: ['./clientes.list.component.css'],
})
export class ClientesListComponent {
  clients: any[] = [];
  allClients: any[] = [];
  datePipe: DatePipe = new DatePipe('en-US');
  clientPipe: ClientFilterPipe = new ClientFilterPipe();
  @Output() listButtonClick = new EventEmitter<void>();
  public selectedClient : DetailClient = {
    id: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    edad: '',
    telefono: '',
    sede: '', 
    membresia: '',
    fechafin: '',
    dni: '',
    fechaNacimiento: ''
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
        this.allClients = data;
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
    if(!input){
      this.clients = this.allClients;
    }
    else{
          this.clients = this.clientPipe.transform(this.allClients, input.value);
    }
  }

  onButtonClick() {
    this.listButtonClick.emit();
  }

}
