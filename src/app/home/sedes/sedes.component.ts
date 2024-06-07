import { Component, TemplateRef } from '@angular/core';
import { SedesService } from './sedes.service';
import { Sede } from './model/sedes.interface';
import { EMPTY, catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { bootstrap } from 'ngx-bootstrap-icons';
import { Modal } from 'bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css'],
})
export class SedesComponent {

  modalRef: BsModalRef | null = null;
  public showActive: boolean = true;

  public processingRequest: boolean = false;
  public succesRequest: boolean = false;

  public activeSedes: Sede[] = [];
  public inactiveSedes: Sede[] = [];
  constructor(private sedesService: SedesService, private modalService: BsModalService) {
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

}
