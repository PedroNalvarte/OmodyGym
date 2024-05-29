import { Component, TemplateRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { MiPlanService } from '../mi-plan/miPlan.service';
import { PerfilService } from './perfil.service';
import { MiPerfil } from './model/miPerfil.interface';


@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {

  dni: string = '';
  url: string = '';
  private subscription: Subscription;

  modalRef?: BsModalRef;
  currentUser$ = this.authService.user$;
  constructor(private authService: AuthService, private modalService: BsModalService, private perfilService: PerfilService) {

    this.subscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.dni = user.dni;
      } else {
        this.dni = 'No disponible';
      }
    });
  }

  ngOnInit(): void {
    this.perfilService.listMiPerfil(this.dni).subscribe(data => {
      this.onDataLoaded();

    });

  }

  get miPerfil(): MiPerfil[] {
    return this.perfilService.miPerfil;
  }



  onDataLoaded() {

    this.url = "https://ui-avatars.com/api/?background=random&size=128&name=" + this.miPerfil[0].nombre_1 + "+" + this.miPerfil[0].apellido_1;

  };













  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.authService.logout();
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }


}
