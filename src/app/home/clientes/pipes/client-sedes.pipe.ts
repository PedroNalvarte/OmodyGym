import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientFilter'
})
export class ClientSedePipe implements PipeTransform {

  transform(clients: any[], searchTerm: string): any[] {
    if(!clients || !searchTerm || !searchTerm.trim()){
      return clients;
    }

    searchTerm = searchTerm.toLowerCase();
    return clients.filter(client => {
      const sede = client.sede.toLowerCase();
      

      return sede.includes(searchTerm);
    })
  }
}
