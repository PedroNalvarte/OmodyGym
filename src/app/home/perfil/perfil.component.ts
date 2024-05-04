import { Component, TemplateRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  modalRef?: BsModalRef;
  currentUser$ =  this.authService.user$;
  constructor(private authService : AuthService, private modalService: BsModalService){}

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
