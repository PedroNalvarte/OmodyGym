import { Component } from '@angular/core';
import { ColaboradoresService } from './colaboradores.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PersonaColaborador } from './model/personaColaborador.interface';

@Component({
  selector: 'colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css'],
})
export class ColaboradoresComponent {

  modalRef: BsModalRef | null = null;

  public processingRequest: boolean = false;

  constructor(private colaboradoresService: ColaboradoresService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.colaboradoresService.listColaboradores().subscribe();
  }

  get colaboradores(): PersonaColaborador[] {
    return this.colaboradoresService.colaboradoresList;
  }

}
