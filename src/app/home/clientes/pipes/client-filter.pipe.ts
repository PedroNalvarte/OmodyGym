import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientFilter'
})
export class ClientFilterPipe implements PipeTransform {

  transform(clients: any[], searchTerm: string): any[] {
    if(!clients || !searchTerm || !searchTerm.trim()){
      return clients;
    }

    searchTerm = searchTerm.toLowerCase();
    return clients.filter(client => {
      const name = `${client.nombre} ${client.apellido1} ${client.apellido2}`.toLowerCase();
      const dni = client.dni

      return name.includes(searchTerm) || dni.includes(searchTerm);
    })
  }
}
