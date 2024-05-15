import { Pipe, PipeTransform } from '@angular/core';
import { Ejercicios } from '../model/ejercicios.interface';


@Pipe({
  name: 'sortEjerciciosName'
})
export class SortEjerciciosNamePipe implements PipeTransform {

  transform(ejercicio: Ejercicios[], sortBy: string): Ejercicios[] {

    if (sortBy !== '') {

      return ejercicio.filter(ejercicio => ejercicio.nombre!.toLowerCase().startsWith(sortBy));

    } else {

      return ejercicio;

    }

  }

}
