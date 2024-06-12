import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Ejercicios } from './model/ejercicios.interface';
import { EjerciciosService } from './ejercicios.service';
import { GrupoMuscular } from './model/grupoMuscular.interface';
import { EMPTY, catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css'],
})
export class EjerciciosComponent {

  modalRef: BsModalRef | null = null;

  public processingRequest: boolean = false;

  public searchEjercicioName: string = '';
  public filterByGrupoMuscular: number = 0;

  constructor(
    private ejerciciosService: EjerciciosService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.ejerciciosService.listEjercicios().subscribe();
    this.ejerciciosService.listGrupoMuscular().subscribe();
  }

  public ejercicioRegistro: Ejercicios = {
    id_grupo_muscular: 0,
    nombre: '',
    imagen: ''
  }

  get ejercicios(): Ejercicios[] {
    return this.ejerciciosService.ejerciciosList;
  }

  get gruposMusculares(): GrupoMuscular[] {
    return this.ejerciciosService.grupoMuscularList;
  }

  resetFilters(): void {
    this.searchEjercicioName = '';
    this.filterByGrupoMuscular = 0;
  }
  showAlert: boolean = false;

  registerEjercicio(modal : TemplateRef<void>) {
    if (this.ejercicioRegistro.id_grupo_muscular && this.ejercicioRegistro.nombre && this.ejercicioRegistro.imagen) {

    this.processingRequest = true;

    this.ejerciciosService
      .registerEjercicio(this.ejercicioRegistro)
      .pipe(
        tap((result) => console.log('Resultado antes de catchError:', result)),
        finalize(() => {
          this.processingRequest = false;
          this.closeModal();
          this.openModal(modal);
          this.ejerciciosService.listEjercicios().subscribe();
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
  } else {
    this.showAlert = true;
    
    
  }
}

  openModal(ModalRegistrarEjercicio: TemplateRef<any>) {
    this.modalRef = this.modalService.show(ModalRegistrarEjercicio, {});
  }

  closeModal() {
    if (this.modalRef) {  // Comprueba si modalRef es no nulo antes de llamar a hide
      this.modalRef.hide();
      this.resetFilters();
    }
  }



}
