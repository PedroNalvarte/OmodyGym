import { Pipe, PipeTransform } from '@angular/core';
import { Ejercicios } from '../model/ejercicios.interface';


@Pipe({
  name: 'sortGrupoMuscular'
})
export class SortGrupoMuscularPipe implements PipeTransform {

  transform(ejercicio: Ejercicios[], sortBy: number): Ejercicios[] {

    console.log(sortBy);


    if (sortBy != 0) {

      console.log('entro');

      return ejercicio.filter(ejercicio => ejercicio.id_grupo_muscular == sortBy);

    } else {

      return ejercicio;

    }

  }

}
