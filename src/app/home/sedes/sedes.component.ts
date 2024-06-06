import { Component, TemplateRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { SedesService } from './sedes.service';
import { Sede } from './model/sedes.interface';
import { EMPTY, catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {
  modalRef: BsModalRef | null = null;
  public showActive: boolean = true;
  public processingRequest: boolean = false;
  public activeSedes: Sede[] = [];
  public inactiveSedes: Sede[] = [];
  public errorRegistro: boolean = false; // Propiedad para manejar errores
  public sedeRegistro: Sede = {
    nombreSede: '',
    abreviacion: '',
    direccion: ''
  };

  @ViewChild('confirmationTemplate') confirmationTemplate!: TemplateRef<any>;

  constructor(private sedesService: SedesService, private modalService: BsModalService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.loadSedes();
  }

  loadSedes(): void {
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
    return this.showActive ? this.activeSedes : this.inactiveSedes;
  }

  resetInput(): void {
    this.sedeRegistro = {
      nombreSede: '',
      abreviacion: '',
      direccion: ''
    };
  }

  registerSede(): void {
    this.processingRequest = true;
    this.errorRegistro = false; // Resetear el estado de error al iniciar el registro

    this.sedesService
      .registerSede(this.sedeRegistro)
      .pipe(
        finalize(() => {
          this.processingRequest = false;
          if (!this.errorRegistro) {
            this.loadSedes();
            this.closeModalAndOpenConfirmation();
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error al registrar la sede:', error);
          this.errorRegistro = true; // Establecer la bandera de error
          return EMPTY;
        })
      )
      .subscribe();
  }

  closeModalAndOpenConfirmation(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(this.confirmationTemplate, { class: 'modal-sm' });
    setTimeout(() => {
      this.modalRef?.hide();
    }, 2000); // Tiempo de demora del pop-up de confirmación
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  changeFilter(): void {
    this.showActive = !this.showActive;
  }

  updateStatus(id: string): void {
    this.processingRequest = true;
    this.sedesService.updateStatus(id).pipe(
      finalize(() => {
        this.loadSedes();
        this.processingRequest = false;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al actualizar el estado de la sede:', error);
        this.processingRequest = false;
        return EMPTY;
      })
    ).subscribe();
  }
}