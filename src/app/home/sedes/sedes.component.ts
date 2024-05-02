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

  public processingRequest: boolean = false;

  constructor(private sedesService: SedesService, private modalService: BsModalService) { }

  get sedes(): Sede[] {
    return this.sedesService.sedeList;
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

    this.sedesService
      .registerSede(this.sedeRegistro)
      .pipe(
        tap((result) => console.log('Resultado antes de catchError:', result)),
        finalize(() => {
          this.processingRequest = false;
          this.closeModal();
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



}
