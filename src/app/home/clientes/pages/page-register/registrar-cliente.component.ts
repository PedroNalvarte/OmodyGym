import { Component, EventEmitter, Output, TemplateRef, ViewChild  } from '@angular/core';
import { DetailClient } from '../../model/detail-client.interface';
import { MembresiasService } from '../../../membresias/membresias.service';
import { SedesService } from '../../../sedes/sedes.service';
import { AuthService } from '../../../../auth/auth.service';
import { ClientsService } from '../../clientes.service';
import { BsModalRef, BsModalService , ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css'],
})
export class RegistrarClienteComponent {
  @Output() registerButtonClick = new EventEmitter<void>();
  selectedMembershipId: string | null = null;
  maxDate? : string;
  public registerClient : DetailClient = {
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
    fechaNacimiento: '',
    usuario: '',
    fecha_nacimiento: '',
    entrenador: ''
  }
  modalRef?: BsModalRef;
  public isMembershipSelected = false;
  public emptyField = false;
  public invalidDni = false;
  public invalidPhone = false;
  memberships: any[] = []; 
  sedes: any[] = []; 
  constructor(private membresiaService: MembresiasService, private sedesService: SedesService, private authService : AuthService, private clientService : ClientsService, private modalService: BsModalService) { }

  ngOnInit() {
    this.GetMemberships();
    this.GetSedes(); 
    var currentDate = new Date();
    currentDate.setFullYear(new Date().getFullYear() - 18).toString();
    this.maxDate = currentDate.toISOString().slice(0, 10);
   }
   GetMemberships(){
    this.membresiaService.getMemberships().subscribe(
      (data) => {
        this.memberships = data;
      },
      (error) => {
        console.log('Error al cargar las membresías:', error);

      }
    );

  }

  GetSedes(){
    this.sedesService.listSede().subscribe(
      (data) => {
        this.sedes = data.filter(x => x.estado == 'A');
      },
      (error) => {
        console.log('Error al cargar las sedes:', error);

      }
    );
  }
  membershipSelected(membership : string){
    this.isMembershipSelected = true;
   this.registerClient.membresia = membership.toString(); 
   this.selectedMembershipId = membership;
  }

  onSubmit(modal : TemplateRef<void>) {
    if(!this.registerClient.nombre.trim() || !this.registerClient.apellido1.trim() || !this.registerClient.apellido2.trim() ||  !this.registerClient.dni.trim() ||  !this.registerClient.fechaNacimiento.trim() ||  !this.registerClient.telefono.trim() ||  !this.registerClient.sede.trim() ||  !this.registerClient.membresia.trim()){
      this.emptyField = true;
    }
    else{
      this.emptyField = false;
      if(isNaN(Number(this.registerClient.dni.trim()))){
        this.invalidDni = true;
      }
      else if(isNaN(Number(this.registerClient.telefono.trim()))){
        this.invalidDni = false;
        this.invalidPhone = true;
      }
      else{
        this.invalidDni = false;
        this.invalidPhone = false;
        this.authService.user$.subscribe(user => {    
          if(user) 
            this.registerClient.usuario = user.dni.toString();
        });

        if(this.registerClient.usuario?.trim()){
          this.clientService.registerCliente(this.registerClient)
          .pipe().subscribe(() => {
              this.openModal(modal);
              setTimeout(() => {
                this.modalRef?.hide();
                this.registerButtonClick.emit();
              }, 2000);            
            }
          )
        }
      

      }

    }
  }
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

}

