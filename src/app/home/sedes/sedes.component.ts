import { Component, TemplateRef } from '@angular/core';
import { SedesService } from './sedes.service';
import { Sede } from './model/sedes.interface';
import { EMPTY, catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { bootstrap } from 'ngx-bootstrap-icons';
import { Modal } from 'bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PersonaColaborador } from '../colaboradores/model/personaColaborador.interface';
import { DetailClient } from '../clientes/model/detail-client.interface';
import { ColaboradoresService } from '../colaboradores/colaboradores.service';
import { ClientsService } from '../clientes/clientes.service';

@Component({
  selector: 'sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css'],
})
export class SedesComponent {

  modalRef: BsModalRef | null = null;
  public showActive: boolean = true;
  public onSelectSede: boolean = false;
  public processingRequest: boolean = false;
  public succesRequest: boolean = false;
  public selectedColaboradores : boolean = false;
  public selectedClients : boolean = false;
  public mensajeEmpty : string = "";
  public activeSedes: Sede[] = [];
  public inactiveSedes: Sede[] = [];
  public allColaborators : PersonaColaborador[] = [];
  public siteTrainers : PersonaColaborador[] = [];
  public siteRecepcionistas : PersonaColaborador[] = [];
  public allClients : DetailClient[] = [];
  public siteClients : DetailClient[] = [];
  public selectedSede : Sede = {
    nombreSede: "",
    abreviacion: "",
    direccion: ""
  }
  constructor(private sedesService: SedesService, private modalService: BsModalService,  private colaboradoresService: ColaboradoresService, private clientService : ClientsService) {
  }

  ngOnInit(): void {
    this.sedesService.listSede().pipe(
      tap((sedes: Sede[]) => {
        this.activeSedes = sedes.filter(sede => sede.estado === 'A');
        this.inactiveSedes = sedes.filter(sede => sede.estado !== 'A');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al listar sedes:', error);
        return EMPTY;
      })
    ).subscribe();

    this.colaboradoresService.listColaboradores().pipe(
      tap((colaboradores: PersonaColaborador[]) => {
        this.allColaborators = colaboradores;
      }
    )).subscribe();

    this.clientService.getClients(undefined).subscribe(
      (data) => {
        this.allClients = data;
      },
      (error) => {
        console.log('Error al cargar los clientes:', error);
      }
    );

  }

  get sedes(): Sede[] {
    if(this.showActive){
      return this.activeSedes;
    }
    else{
      return this.inactiveSedes;
    }
  }

  public sedeRegistro: Sede = {
    nombreSede: '',
    abreviacion: '',
    direccion: ''
  }

  resetInput(): void {

    this.sedeRegistro.nombreSede = '';
    this.sedeRegistro.abreviacion = '';
    this.sedeRegistro.direccion = '';

  }

  registerSede(): void {

    this.processingRequest = true;
    this.succesRequest = false;

    this.sedesService
      .registerSede(this.sedeRegistro)
      .pipe(
        tap((result) => console.log('Resultado antes de catchError:', result)),
        finalize(() => {

          
          this.succesRequest = true;

          setTimeout(() => {
            this.succesRequest = false;
            this.processingRequest = false;
            this.closeModal();
        }, 3000);

          this.sedesService.listSede().pipe(
            tap((sedes: Sede[]) => {
              this.activeSedes = sedes.filter(sede => sede.estado === 'A');
              this.inactiveSedes = sedes.filter(sede => sede.estado !== 'A');
            }),
            catchError((error: HttpErrorResponse) => {
              console.error('Error al listar sedes:', error);
              return EMPTY;
            })
          ).subscribe();
        }
        ),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return EMPTY;
          }

          throw error;
        })
      )
      .subscribe();

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {

    if (this.modalRef) {  // Comprueba si modalRef es no nulo antes de llamar a hide
      this.modalRef.hide();
    }
  }

  changeFilter(){
    this.showActive = !this.showActive;
  }

  updateStatus(id : string){
    this.processingRequest = true;
    this.sedesService.updateStatus(id).pipe(
      finalize(() => {
        this.sedesService.listSede().pipe(
          tap((sedes: Sede[]) => {
            this.activeSedes = sedes.filter(sede => sede.estado === 'A');
            this.inactiveSedes = sedes.filter(sede => sede.estado !== 'A');
            this.processingRequest = false;
          }),
          catchError((error: HttpErrorResponse) => {
            console.error('Error al listar sedes:', error);
            return EMPTY;
          })
        ).subscribe();
      })
    ).subscribe();
  }

  selectSede(sede : Sede){
    this.selectedSede = sede;
    this.onSelectSede = true;
  }
  onColaboradores(modal : TemplateRef<void>){
      this.siteTrainers = this.allColaborators.filter(x => x.idSede == this.selectedSede.idSede && x.id_tipo_persona == 1);
      this.siteRecepcionistas = this.allColaborators.filter(x => x.idSede == this.selectedSede.idSede && x.id_tipo_persona == 2);
      
      if(this.siteTrainers.length == 0 && this.siteRecepcionistas.length == 0){
        this.mensajeEmpty = "No hay colaboradores registrados en esta sede";
        this.openModal(modal);
              setTimeout(() => {
                this.modalRef?.hide();
              }, 2000);
      }
      else{
        this.selectedColaboradores = true;
        this.selectedClients = false;
      }


  }

  onClientes(modal : TemplateRef<void>){
    this.siteClients = this.allClients.filter(x => x.idSede == this.selectedSede.idSede);
    if(this.siteClients.length == 0){
      this.mensajeEmpty = "No hay clientes registrados en esta sede";
      this.openModal(modal);
      setTimeout(() => {
        this.modalRef?.hide();
      }, 2000);
    }
    else{
      this.selectedColaboradores = false;
      this.selectedClients = true;
    }
  }
}
