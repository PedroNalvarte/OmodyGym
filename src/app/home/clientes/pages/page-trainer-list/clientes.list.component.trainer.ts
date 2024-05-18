import { Component, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ClientsService } from '../../clientes.service';
import { AuthService } from '../../../../auth/auth.service';
import { DetailClient } from '../../model/detail-client.interface';
import { DatePipe } from '@angular/common';
import { IdMembership } from '../../../membresias/model/id-membership.interface';
import { ClientFilterPipe } from '../../pipes/client-filter.pipe';
import { ClientSedePipe } from '../../pipes/client-sedes.pipe';
import { SedesService } from '../../../sedes/sedes.service';
import { Sede } from '../../../sedes/model/sedes.interface';
import { inbox } from 'ngx-bootstrap-icons';
import { BsModalRef, BsModalService , ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'clientes-trainer-list',
  templateUrl: './clientes.list.trainer.component.html',
  styleUrls: ['./clientes.list.trainer.component.css'],
})
export class ClientesListTrainerComponent {
  modalRef?: BsModalRef;
  clients: any[] = [];
  allClients: any[] = [];
  datePipe: DatePipe = new DatePipe('en-US');
  clientPipe: ClientFilterPipe = new ClientFilterPipe();
  sedesPipe: ClientSedePipe = new ClientSedePipe();
  @Output() registerPlanButtonClick = new EventEmitter<any>();
  clientSelected = false;
  currentUserRole : any;
  currentUserId : any;
  public selectedClient : DetailClient = {
    Id: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    edad: '',
    telefono: '',
    sede: '', 
    membresia: '',
    fechafin: '',
    dni: '',
    fecha_nacimiento: '',
    fechaNacimiento: '',
    entrenador: '',
    idEntrenador: 0,
    modificacion_plan: '',
    modificacion_metricas: ''
  }
  inputContainer: IdMembership = {
    id: ''
  };
  constructor(private authService : AuthService,private modalService: BsModalService, private clientService : ClientsService, private sedesService : SedesService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.currentUserRole = user?.role;
      this.currentUserId = user?.dni
    });
    this.GetClients();
    this.sedesService.listSede().subscribe();


   }

   GetClients(){
    this.clientService.getClients(this.currentUserId).subscribe(
      (data) => {
        this.clients = data;
        this.allClients = data;
      },
      (error) => {
        console.log('Error al cargar los clientes:', error);
      }
    );

  }

  get sedes(): Sede[] {
    return this.sedesService.sedeList;
  }

  onSelect(client : DetailClient){
    this.selectedClient = client;
    var truedate = this.datePipe.transform(this.selectedClient.fechafin, 'yyyy-MM-dd');
    var nacimiento = this.datePipe.transform(this.selectedClient.fecha_nacimiento, 'yyyy-MM-dd');
    if(truedate){
      this.selectedClient.fechafin = truedate;
    }
    if(nacimiento){
      this.selectedClient.fecha_nacimiento = nacimiento;
    };
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

  asignTrainer(modal : TemplateRef<void>){
    this.clientService.asignTrainer(this.selectedClient.Id, this.currentUserId)
    .pipe().subscribe(() => {
      this.openModal(modal);
      setTimeout(() => {
        this.modalRef?.hide();
        this.clientSelected = false;
      }, 2000);
  })
}

  filtrarPorSede(input : any){
    if(!input || input.value == "empty"){
      this.clients = this.allClients;
    }
    else{
          this.clients = this.sedesPipe.transform(this.allClients, input.value);
    }
  }



  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }


  toRegisterPlan(){
    this.registerPlanButtonClick.emit(this.selectedClient);
  }
}
