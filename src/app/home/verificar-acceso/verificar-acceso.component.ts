import { Component } from '@angular/core';
import { AccesoService } from './acceso.service';
import { Acceso } from './model/acceso.interface';

@Component({
  selector: 'verificar-acceso',
  templateUrl: './verificar-acceso.component.html',
  styleUrls: ['./verificar-acceso.component.css'],
})
export class VerificarAccesoComponent {

  public fechaActual: Date;

  constructor(private accesoService: AccesoService) {

    this.fechaActual = new Date();
  }



  public processingRequest = false;
  public dniBuscar: string = "";
  public mensajeError: string = ""

  //Variables de botones
  public pagado: boolean | null = null;

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

    console.log(diaPago);
    console.log(this.accesos[0].dia_pago);

    if ((inicioPeriodo <= diaPago || diaPago >= finPeriodo) && diaPago !== null) {

      console.log('pago realizado');
      this.pagado = true;

    } else {

      console.log('pago no realizado');
      this.pagado = false;

    }



  }

}
