import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexo'
})
export class SexoPipe implements PipeTransform {

  transform(sexo: string): string {
    if (!sexo) {
      return '';
    }
    if (sexo == 'M') {
      return 'Masculino'
    } else {
      return 'Femenino';
    }

  }
}
