import { Component, TemplateRef } from '@angular/core';
import { ColaboradoresService } from './colaboradores.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PersonaColaborador } from './model/personaColaborador.interface';
import { Sede } from '../sedes/model/sedes.interface';
import { SedesService } from '../sedes/sedes.service';
import { EMPTY, catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css'],
})
export class ColaboradoresComponent {

  modalRef: BsModalRef | null = null;

  public processingRequest: boolean = false;
  public succesRegister: boolean = false;

  //------------Filtros---------------
  public searchByName: string = '';
  public sortTipoColab: string = '';

  public activeFilterEntrenador: boolean = false;
  public activeFilterRecepcionista: boolean = false;
  //-----------End filtros-------------

  //Detalle
  public detalleIndex: number = 0;

  public personaRegistro: PersonaColaborador = {
    nombre_1: '',
    nombre_2: '',
    apellido_1: '',
    apellido_2: '',
    fecha_nacimiento: new Date(),
    correo: '',
    sexo: '',
    telefono: '',
    numero_documento_identidad: '',
    id_tipo_persona: 0,
    idSede: 0
  }

  public personaDetalle: PersonaColaborador | undefined = undefined;

  constructor(
    private colaboradoresService: ColaboradoresService,
    private modalService: BsModalService,
    private sedesService: SedesService

  ) { }

  ngOnInit(): void {
    this.colaboradoresService.listColaboradores().subscribe();
    this.sedesService.listSede().subscribe();
  }

  get sedes(): Sede[] {
    return this.sedesService.sedeList;
  }

  get colaboradores(): PersonaColaborador[] {
    return this.colaboradoresService.colaboradoresList;
  }

  registerColaborador(): void {

    this.processingRequest = true;

    this.colaboradoresService
      .registerColaboradores(this.personaRegistro)
      .pipe(
        tap((result) => console.log('Resultado antes de catchError:', result)),
        finalize(() => {
          
          this.succesRegister = true;

          setTimeout(() => {
            this.closeModal();
            this.succesRegister = false;
            this.processingRequest = true;
        }, 3000);

          //
          this.colaboradoresService.listColaboradores().subscribe();
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

  //----------------------Modal Registrar Colaborador------------------------------------
  openModal(ModalRegistrarColaborador: TemplateRef<any>) {
    this.modalRef = this.modalService.show(ModalRegistrarColaborador, { class: 'modal-lg' });
  }

  closeModal() {

    if (this.modalRef) {  // Comprueba si modalRef es no nulo antes de llamar a hide
      this.modalRef.hide();
    }
  }

  openModalDetalles(ModalDetalleColaborador: TemplateRef<any>, id?: number): void {

    if (id) {

      // this.colaboradoresService.listColaboradores().subscribe((colaboradores: PersonaColaborador[] | undefined) => {
      //   if (colaboradores && colaboradores.length > 0) {
      //     this.personaDetalle = colaboradores.find(colaborador => colaborador.id_persona === id) || null;
      //   } else {
      //     this.personaDetalle = null;
      //   }

      if (this.colaboradores && this.colaboradores.length > 0) {
        this.personaDetalle = this.colaboradores.find(colaborador => colaborador.id_persona === id);
      } else {
        this.personaDetalle = undefined;
      }

      this.modalRef = this.modalService.show(ModalDetalleColaborador, {});

      //});
    }


  }
  //----------------------Fin Modal Registrar Colaborador--------------------------------

  clickEntrenadoresFilter() {

    if (this.activeFilterEntrenador === true) {

      this.activeFilterEntrenador = false;
      this.activeFilterRecepcionista = false;
      this.sortTipoColab = '';

    } else {

      this.activeFilterEntrenador = true;
      this.activeFilterRecepcionista = false;
      this.sortTipoColab = 'entrenador';
    }

  }

  clickRecepcionistaFilter() {

    if (this.activeFilterRecepcionista === true) {

      this.activeFilterEntrenador = false;
      this.activeFilterRecepcionista = false;
      this.sortTipoColab = '';

    } else {

      this.activeFilterEntrenador = false;
      this.activeFilterRecepcionista = true;
      this.sortTipoColab = 'recepcionista';
    }

  }

}
