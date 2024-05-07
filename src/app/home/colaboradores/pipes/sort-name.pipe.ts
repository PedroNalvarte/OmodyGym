import { Pipe, PipeTransform } from '@angular/core';
import { PersonaColaborador } from '../model/personaColaborador.interface';


@Pipe({
  name: 'sortName'
})
export class SortNamePipe implements PipeTransform {

  transform(colaboradores: PersonaColaborador[], sortBy: string): PersonaColaborador[] {

    if (sortBy !== '') {

      return colaboradores.filter(colaboradores => colaboradores.apellido_1!.toLowerCase().startsWith(sortBy) || colaboradores.nombre_1!.toLowerCase().startsWith(sortBy));

    } else {

      return colaboradores;

    }

  }

}
