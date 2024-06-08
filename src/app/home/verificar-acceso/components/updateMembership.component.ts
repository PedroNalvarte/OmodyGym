import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef,  BsModalService , ModalDirective } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { DetailMembership } from '../../membresias/model/detail-membership.insterface';
import { UpdateMembershipModel } from './updateMembership.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { AccesoService } from '../acceso.service';
@Component({
  selector: 'create-form-component',
  templateUrl: './updateMembership.component.html',
  styleUrls: ['./updateMembership.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class UpdateMembership implements OnInit {
  modalRef?: BsModalRef;
  title?: string;
  closeBtnName?: string;
  dni?: string;
  nombreCliente?: string;
  membresias? : any[];
  sedes? : any[];
  list: string[] = [];
  oldDate?: Date;
  invalidMembership = false;
  invalidSede = false;
  invalidDate = false;
  id_persona? : number;
  public payload : UpdateMembershipModel = {
    idMembresia : 0,
    idSede : 0,
    fecha : undefined,
    idUsuario : 0
  };
  processingRequest = false;
  @Output() formSubmitted = new EventEmitter<any>();
  constructor(public bsModalRef: BsModalRef,  private modalService: BsModalService, private authService: AuthService, private accesoService : AccesoService) {  }
  public emptyField = false;
  public invalidCost = false;
  ngOnInit() {
  }
  onSubmit(modal : TemplateRef<void>) {
    if(this.id_persona){
      this.payload.idUsuario = this.id_persona;
    }

    if(this.payload.idMembresia == 0){
      this.invalidMembership = true;
    }
    else{
      this.invalidMembership = false;
    }
    if(this.payload.idSede == 0){
      this.invalidSede = true;
    }
    else{
      this.invalidSede = false;
    }

    if(this.payload.fecha == undefined){
      this.invalidDate = true;
    }
    else{
      this.invalidDate = false;
    }

    if(!this.invalidDate && !this.invalidMembership && !this.invalidSede && this.payload.idUsuario != 0){
      this.processingRequest = true;
      this.accesoService.updateAcceso(this.payload).pipe().subscribe();
      this.openModal(modal);
      setTimeout(() => {
        this.modalRef?.hide();
      }, 2000);
      this.bsModalRef.hide();
      this.formSubmitted.emit()
    }
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);

  }
}
