import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Role } from '../../auth/model';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/model/user.interface';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class HeaderComponent {
  currentUser$ =  this.authService.user$;
  constructor(private authService : AuthService){}

  logout(): void{
    this.authService.logout();
  }
}


