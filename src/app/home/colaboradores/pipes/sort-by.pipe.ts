import { Pipe, PipeTransform } from '@angular/core';
import { PersonaColaborador } from '../model/personaColaborador.interface';


@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(colaboradores: PersonaColaborador[], sortBy: string): PersonaColaborador[] {

    switch (sortBy) {

      case 'entrenador':
        return colaboradores.filter(colaboradores => colaboradores.detalle_tipo!.toLowerCase() === 'entrenador');


      case 'recepcionista':
        return colaboradores.filter(colaboradores => colaboradores.detalle_tipo!.toLowerCase() === 'recepcionista');


      default:
        return colaboradores;

    }

  }

}
