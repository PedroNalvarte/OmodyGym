import { Component } from '@angular/core';
import { AccesoService } from './acceso.service';
import { Acceso } from './model/acceso.interface';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { UpdateMembership } from './components/updateMembership.component';
import { MembresiasService } from '../membresias/membresias.service';
import { SedesService } from '../sedes/sedes.service';
@Component({
  selector: 'verificar-acceso',
  templateUrl: './verificar-acceso.component.html',
  styleUrls: ['./verificar-acceso.component.css'],
})
export class VerificarAccesoComponent {

  public fechaActual: Date;
  modalCreate?: BsModalRef;
  membresias? :any[] = []; 
  sedes?: any[] = [];
  constructor(private accesoService: AccesoService, private membresiaService: MembresiasService, private modalService: BsModalService, private sedesService: SedesService) {

    this.fechaActual = new Date();
  }



  public processingRequest = false;
  public dniBuscar: string = "";
  public mensajeError: string = ""

  //Variables de botones
  public pagado: boolean | null = null;
  public membresia: boolean | null = null;
  get accesos(): Acceso[] {
    return this.accesoService.AccesoList;
  }

  verificaAcceso() {

    if (!this.dniBuscar) {
      // Maneja el caso en que el DNI no está definido o está vacío
      return;
    }

    this.processingRequest = true;
    this.mensajeError = "";

    this.accesoService.listAcceso(this.dniBuscar).subscribe(() => {
      this.processingRequest = false;

      this.resultController(this.accesos.length);

    });

  }

  resultController(length: number) {

    if (length !== 1) {
      this.dniBuscar = "";
      this.mensajeError = "Cliente no encontrado :(";
    } else {
      this.statusController();
    }

  }

  statusController() {

    const diaPago = new Date(this.accesos[0].dia_pago);
    const finPeriodo = new Date(this.accesos[0].fin_periodo);
    const inicioPeriodo = new Date(this.accesos[0].inicio_periodo);
    var estadoMembresia;
    if(this.accesos[0].estado_membresia != null && this.accesos[0].estado_membresia != undefined){
      estadoMembresia = new Date(this.accesos[0].estado_membresia);
    }
    else{
      estadoMembresia = null;
    }
   
    console.log(diaPago);
    console.log(this.accesos[0].dia_pago);

    if ((inicioPeriodo <= diaPago || diaPago >= finPeriodo) && diaPago !== null) {

      console.log('pago realizado');
      this.pagado = true;

    } else {

      console.log('pago no realizado');
      this.pagado = false;

    }

    if(estadoMembresia != null && estadoMembresia > this.fechaActual){
      this.membresia = true;
    }
    else
    {
      this.membresia = false;
    }

  }
  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        
      }
    }
    this.modalCreate = this.modalService.show(UpdateMembership, initialState);
    this.modalCreate.content.closeBtnName = 'Close';
    this.modalCreate.content.dni = this.accesos[0].numero_documento_identidad;
    this.modalCreate.content.nombreCliente = this.accesos[0].nombre_cliente;
    this.modalCreate.content.membresias = this.membresias;
    this.modalCreate.content.id_persona = this.accesos[0].id_persona;
    this.modalCreate.content.sedes = this.sedes?.filter(x => x.estado == 'A');
    if(this.accesos[0].estado_membresia != null){
      this.modalCreate.content.oldDate = new Date(this.accesos[0].estado_membresia).toISOString().slice(0, 10);
    }
    else{
      this.modalCreate.content.oldDate = this.fechaActual.toISOString().slice(0, 10);
    }

  
    if(this.modalCreate.onHidden != undefined){
        this.modalCreate.onHidden.subscribe(() => {
          this.processingRequest = true;
          this.mensajeError = "";

          this.accesoService.listAcceso(this.dniBuscar).subscribe(() => {
            this.processingRequest = false;

            this.resultController(this.accesos.length);

          });
        })
    }
};

GetMemberships(){
  this.membresiaService.getMemberships().subscribe(
    (data) => {
      this.membresias = data;
    },
    (error) => {
      console.log('Error al cargar las membresías:', error);

    }
  );

}

GetSedes(){
  this.sedesService.listSede().subscribe(
    (data) => {
      this.sedes = data;
    },
    (error) => {
      console.log('Error al cargar las sedes:', error);

    }
  );
}
ngOnInit() {
  this.GetMemberships();
  this.GetSedes();
}

}
