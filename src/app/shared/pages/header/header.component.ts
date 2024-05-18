import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Role } from '../../../auth/model';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../auth/model/user.interface';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class HeaderComponent {

  dni: string = '';
  miPlanLink: string = '';
  private subscription: Subscription;


  constructor(private authService: AuthService) {

    this.subscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.dni = user.dni;
        this.miPlanLink = '/miPlan/' + this.dni;// Asegúrate de que la interfaz UserWithToken tenga definida la propiedad dni
      } else {
        this.dni = 'No disponible';
      }
    });
  }
}


