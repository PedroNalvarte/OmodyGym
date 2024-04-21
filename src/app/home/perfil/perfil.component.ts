import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  currentUser$ =  this.authService.user$;
  constructor(private authService : AuthService){}

  logout(): void{
    this.authService.logout();
  }


}
