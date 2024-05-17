import { Component, Output, EventEmitter, TemplateRef, Input } from '@angular/core';
import { ClientsService } from '../../clientes.service';
import { AuthService } from '../../../../auth/auth.service';
import { DetailClient } from '../../model/detail-client.interface';
import { DatePipe } from '@angular/common';
import { IdMembership } from '../../../membresias/model/id-membership.interface';
import { ClientFilterPipe } from '../../pipes/client-filter.pipe';
import { ClientSedePipe } from '../../pipes/client-sedes.pipe';
import { SedesService } from '../../../sedes/sedes.service';
import { Sede } from '../../../sedes/model/sedes.interface';
import { inbox } from 'ngx-bootstrap-icons';
import { BsModalRef, BsModalService , ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'register-training-plan',
  templateUrl: './register.training.plan.component.html',
  styleUrls: ['./register.training.plan.component.css'],
})

export class RegisterTrainingPlan {
  @Input() receivedClient: any;
  day1Completed = false;
  day2Completed = false;
  day3Completed = false;
  day4Completed = false;
  day5Completed = false;
  day6Completed = false;
  day7Completed = false;
  planCompleted = false;
  onChoosingDay = false;
  onExcerciseStore = false;
  selectedDay = 0;
  @Output() back = new EventEmitter<any>();
  constructor(private authService : AuthService,private modalService: BsModalService, private clientService : ClientsService, private sedesService : SedesService) { }

  ngOnInit() {
    this.onChoosingDay = true;
  }

  dayClicked(day : any){
      this.selectedDay = day;
      this.onExcerciseStore = true;
      this.onChoosingDay = false
  }
  
  goBack(){
    this.back.emit();
  }
}





