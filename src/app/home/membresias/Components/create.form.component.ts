import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef,  BsModalService , ModalDirective } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { CreateMembership } from '../model/create-membership.interface';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { MembresiasService } from '../membresias.service';
@Component({
  selector: 'create-form-component',
  templateUrl: './create.form.component.html',
  styleUrls: ['./create.form.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class CreateFormComponent implements OnInit {
  modalRef?: BsModalRef;
  title?: string;
  closeBtnName?: string;
  list: string[] = [];
  @Output() formSubmitted = new EventEmitter<any>();
  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService, private authService: AuthService, private membresiaService: MembresiasService) {  }
  public emptyField = false;
  public invalidCost = false;
  public createMembership: CreateMembership = {
    detail: '',
    name: '',
    cost: '',
    user: ''
  };
  ngOnInit() {
  }
  onSubmit(modal : TemplateRef<void>) {
    if(this.createMembership.name.trim() && this.createMembership.cost.trim() && this.createMembership.detail.trim()){
        if(isNaN(Number(this.createMembership.cost.trim()))){
          this.invalidCost = true;
        }
        else{
          this.authService.user$.subscribe(user => {    
            if(user) 
              this.createMembership.user = user.dni;
          });

          if(this.createMembership.user.trim()){
            this.membresiaService.registerMembership(this.createMembership)
            .pipe().subscribe();
            this.openModal(modal);
            setTimeout(() => {
              this.modalRef?.hide();
            }, 2000);
            this.bsModalRef.hide();
            this.formSubmitted.emit()
          }
        }

    }
    else{
      this.emptyField = true;
    }
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
