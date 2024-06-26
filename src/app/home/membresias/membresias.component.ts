import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateFormComponent } from './Components/create.form.component';
import { MembresiasService } from './membresias.service';
import { FormsModule } from '@angular/forms';
import { IdMembership } from './model/id-membership.interface';
import { finalize } from 'rxjs';
@Component({
  selector: 'membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css']
})
export class MembresiasComponent {
  modalCreate?: BsModalRef;
  currentUser$ =  this.authService.user$;
  memberships: any[] = [];
  inactiveMemberships: any[] = [];
  listActive = true;
  listInactive = false;
  updatedId: IdMembership = {
    id: ''
  };

  constructor(private authService : AuthService, private modalService: BsModalService, private membresiaService: MembresiasService) {  }
  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        
      }
    };


    this.modalCreate = this.modalService.show(CreateFormComponent, initialState);
    this.modalCreate.content.closeBtnName = 'Close';
    if(this.modalCreate.onHidden != undefined){
        this.modalCreate.onHidden.subscribe(() => {
          this.GetMemberships();
        })
    }

  }

  ngOnInit() {
   this.GetMemberships();
   this.GetInactiveMemberships();
  }

  GetMemberships(){
    this.membresiaService.getMemberships().subscribe(
      (data) => {
        this.memberships = data;
      },
      (error) => {
        console.log('Error al cargar las membresías:', error);

      }
    );

  }
  GetInactiveMemberships(){
    this.membresiaService.getInactiveMemberships().subscribe(
      (data) => {
        this.inactiveMemberships = data;
        console.log(data);
      },
      (error) => {
        console.log('Error al cargar las membresías:', error);

      }
    );

  }
  showActive(){
    if(!this.listActive){
      this.listActive  = !this.listActive;
      this.listInactive = false;
    }
  } 

  showInactive(){
    if(!this.listInactive){
      this.listInactive  = !this.listInactive;
      this.listActive = false;
    }
  }

  updateStatus(id : string){
    this.updatedId.id = id;
    this.membresiaService.updateStatus(this.updatedId).pipe(
      finalize(() => {
        this.GetMemberships();
        this.GetInactiveMemberships();
      })
    ).subscribe();
    this.GetMemberships();
    this.GetInactiveMemberships();
  }
}
