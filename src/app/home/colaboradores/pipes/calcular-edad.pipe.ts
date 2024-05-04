import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcularEdad'
})
export class CalcularEdadPipe implements PipeTransform {

  transform(fechaNacimiento: Date | string): number {
    if (!fechaNacimiento) {
      return 0;
    }
    const fechaNac = fechaNacimiento instanceof Date ? fechaNacimiento : new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  }
}
