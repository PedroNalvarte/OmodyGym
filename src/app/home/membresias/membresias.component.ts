import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateFormComponent } from './Components/create.form.component';

@Component({
  selector: 'membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css'],

})
export class MembresiasComponent {
  modalCreate?: BsModalRef;
  currentUser$ =  this.authService.user$;
  
  constructor(private authService : AuthService, private modalService: BsModalService) {  }
  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        list: ['Open a modal with component', 'Pass your data', 'Do something else', '...'],
        title: 'Modal with component'
      }
    };


    this.modalCreate = this.modalService.show(CreateFormComponent, initialState);
    this.modalCreate.content.closeBtnName = 'Close';
  }
}
