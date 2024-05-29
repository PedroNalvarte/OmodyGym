import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { MiProgresoService } from './miProgreso.service';
import { MisMetricas } from './model/misMetricas.interface';

@Component({
  selector: 'estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent {

  public processingRequest = true;
  dni: string = '';
  private subscription: Subscription;

  constructor(private authService: AuthService, private miProgresoService: MiProgresoService) {

    this.subscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.dni = user.dni;
      } else {
        this.dni = 'No disponible';
      }
    });
  }

  ngOnInit(): void {
    this.miProgresoService.listMiPerfil(this.dni).subscribe(data => this.processingRequest = false);

  }

  get misMetricas(): MisMetricas[] {
    return this.miProgresoService.miProgreso;
  }



}
