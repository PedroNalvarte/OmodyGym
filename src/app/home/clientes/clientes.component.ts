import { Component } from '@angular/core';
import { ClientsService } from './clientes.service';
import { AuthService } from '../../auth/auth.service';
import { DetailClient } from './model/detail-client.interface';
import { DatePipe } from '@angular/common';
import { IdMembership } from '../membresias/model/id-membership.interface';
import { ClientFilterPipe } from './pipes/client-filter.pipe';
import { ClientesListComponent } from './pages/page-list/clientes.list.component';
@Component({
  selector: 'clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  public onRegister = false;
  public onList = true;
  constructor(private authService : AuthService, private clientService : ClientsService) { }

  goToRegister(){
    this.onRegister = true;
    this.onList = false;
  }

  goToList(){
    this.onRegister = false;
    this.onList = true;
  }
}
