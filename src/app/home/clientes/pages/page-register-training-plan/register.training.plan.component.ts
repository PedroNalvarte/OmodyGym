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
import { EjerciciosService } from '../../../ejercicios/ejercicios.service';
import { Ejercicios } from '../../../ejercicios/model/ejercicios.interface';
import { GrupoMuscular } from '../../../ejercicios/model/grupoMuscular.interface';
import { TrainingPlanService } from './training.plan.service';
import { registerTraining } from '../models/register-training.interface';
import { concatMap } from 'rxjs';
@Component({
  selector: 'register-training-plan',
  templateUrl: './register.training.plan.component.html',
  styleUrls: ['./register.training.plan.component.css'],
})

export class RegisterTrainingPlan {
  public filterByGrupoMuscular: number = 0;
  public searchEjercicioName: string = '';
  public currentPlan: number = 0;
  ejerciciosGuardados: any[] = [];
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
  countExcercises = 0;
  @Output() back = new EventEmitter<any>();
  modalRef?: BsModalRef;
  constructor(private ejerciciosService : EjerciciosService, private trainingPlanService : TrainingPlanService, private modalService: BsModalService) { }

  ngOnInit() {
    this.onChoosingDay = true;
    this.ejerciciosService.listEjercicios().subscribe();
    this.ejerciciosService.listGrupoMuscular().subscribe();
    this.GetLastPlan();
  }

  get ejercicios(): Ejercicios[] {
    return this.ejerciciosService.ejerciciosList;
  }

  get gruposMusculares(): GrupoMuscular[] {
    return this.ejerciciosService.grupoMuscularList;
  }

  dayClicked(day : any){
    this.ejercicios.forEach(ejercicio => {
      ejercicio.series = 0;
      ejercicio.repeticiones = 0;
    });
      this.selectedDay = day;
      this.onExcerciseStore = true;
      this.onChoosingDay = false
  }
  
  goBack(){
    this.GetLastPlan();
    this.back.emit();
  }

  goToDays(){
    this.onExcerciseStore = false;
    this.onChoosingDay = true;
    if(this.day1Completed && this.day2Completed && this.day3Completed && this.day4Completed && this.day5Completed && this.day6Completed && this.day7Completed){
      this.planCompleted = true;
    }
    this.countExcercises = 0
  }

  incrementar(ejercicio : any, variable : any){
    const ejercicioSeleccionado = this.ejercicios.find(e => e.id_ejercicio === ejercicio);

    if(ejercicioSeleccionado != undefined){

        if (ejercicioSeleccionado.repeticiones === undefined) {
          ejercicioSeleccionado.repeticiones = 0;
      }
      if (ejercicioSeleccionado.series === undefined) {
          ejercicioSeleccionado.series = 0;
      }

      if (variable === 'r') {
          ejercicioSeleccionado.repeticiones++;
      } else if (variable === 's') {
          ejercicioSeleccionado.series++;
      }
    
    }

    
  }

  
  disminuir(ejercicio : any, variable : any){
    const ejercicioSeleccionado = this.ejercicios.find(e => e.id_ejercicio === ejercicio);
    if(ejercicioSeleccionado != undefined){
      if (ejercicioSeleccionado.repeticiones === undefined) 
        {
          ejercicioSeleccionado.repeticiones = 0;
        }
    if (ejercicioSeleccionado.series === undefined) 
        {
        ejercicioSeleccionado.series = 0;
        }

    if (variable === 'r') 
      {
        if (ejercicioSeleccionado.repeticiones > 0) {
          ejercicioSeleccionado.repeticiones--;
        }
      } else if (variable === 's') 
      {
        if (ejercicioSeleccionado.series > 0) {
          ejercicioSeleccionado.series--;
        }
      }
    }
  }

  resetFilters(): void {
    this.searchEjercicioName = '';
    this.filterByGrupoMuscular = 0;
  }

  guardarEjercicio(ejercicio: any) {

    const row: registerTraining = {
      idUsuario: this.receivedClient.Id,
      idEntrenador: this.receivedClient.idEntrenador,
      idEjercicio: ejercicio.id_ejercicio,
      idPlanEntrenamiento: this.currentPlan,
      series: ejercicio.series,
      repeticiones: ejercicio.repeticiones,
      dia: this.selectedDay
    };
    this.ejerciciosGuardados.push(row);
    this.countExcercises++
  }

  registrarDia(){
    if(this.selectedDay == 1){
      this.day1Completed = true;
    }
    else if(this.selectedDay == 2){
      this.day2Completed = true;
    }
    else if(this.selectedDay == 3){
      this.day3Completed = true;
    }
    else if(this.selectedDay == 4){
      this.day4Completed = true;
    }
    else if(this.selectedDay == 5){
      this.day5Completed = true;
    }
    else if(this.selectedDay == 6){
      this.day6Completed = true;
    }
    else{
      this.day7Completed = true;
    }
    console.log(this.ejerciciosGuardados);
    this.goToDays();

  }

  registrarPlan(modal : TemplateRef<void>){
    this.trainingPlanService.deleteLastPlan(this.receivedClient.Id).pipe(
      concatMap(() => this.trainingPlanService.registerEjercicio(this.ejerciciosGuardados))
    ).subscribe( () => {
      this.openModal(modal);
      setTimeout(() => {
        this.modalRef?.hide();
      }, 2000);

      this.goBack();
    },
    (error) => {
      console.log(error);
    }
    );
  }
  GetLastPlan(){
    this.trainingPlanService.getLastPlan().subscribe(
      (data) => {
        this.currentPlan = parseInt(data);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}





