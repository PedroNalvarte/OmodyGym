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
import { MetricsService } from './metrics.service';
import { registerTraining } from '../models/register-training.interface';
import { Metric } from '../models/metrics-interface';
import { Month } from '../models/months.interface';
@Component({
  selector: 'client-metrics-plan',
  templateUrl: './client.metrics.component.html',
  styleUrls: ['./client.metrics.component.css'],
})

export class ClientMetrics {
  @Input() receivedClient: any;
  @Output() back = new EventEmitter<any>();
  hasMetrics = false;
  onRegisterMetrics = false;
  actualMetric? : Metric;
  modalRef?: BsModalRef;
  clientMetrics? : Metric[];
  MonthList: Month[] = [];
  SelectedMonth?: number;
  processingRequest = true;
  completedForm = false;

  badHeightFormat = false;
  badWeightFormat = false;
  badIdealWeightFormat = false;
  constructor(private metricsService : MetricsService,  private modalService: BsModalService) { }
  public registerMetric : Metric = {
    id_persona: 0,
    peso: undefined,
    altura: undefined,
    edad: '',
    objetivo: '',
    consecutivo: '',
    grasa: '',
    imc: '',
    bicep_izquierdo: undefined,
    bicep_derecho: undefined,
    cadera: undefined,
    cintura: undefined,
    muslo_izquierdo: undefined,
    muslo_derecho: undefined,
    fecha: '',
    mes: '',
    meta: 'P',
    usuario_modificacion: undefined
  }
  ngOnInit() {
    console.log(this.receivedClient);
    if(this.receivedClient.modificacion_metricas){
      this.hasMetrics = true;
      this.metricsService.getClientMetrics(this.receivedClient.Id).subscribe(
        (data) => {
          this.clientMetrics = data;
          this.clientMetrics.forEach(metric => {
            if(metric.meta == 'P'){
              metric.meta = "Bajar de peso";
            }
            else if(metric.meta == 'T'){
              metric.meta = 'Tonificar';
            }
            else {
              metric.meta = 'Aumentar Masa';
            }
          });
          this.actualMetric = this.clientMetrics.find(metric => metric.estado === "A");
          this.populateMonthList(this.clientMetrics);
          this.SelectedMonth = this.actualMetric?.mes_numero;
          this.processingRequest = false;

        },
        (error) => {
          console.log('Error al cargar las metricas:', error);
  
        }
      );
    }else{
      this.processingRequest = false;
    }
  }



  goBack(){
    this.back.emit();
  }

  toRegisterMetrics(){
    this.onRegisterMetrics = true;
  }

  populateMonthList(metrics: Metric[]) {
    const addUniqueMonth = (months: Month[], month: Month) => {
      const exists = months.some(m => m.value === month.value && m.name === month.name);
      if (!exists) {
        months.push(month);
      }
    };
    metrics.forEach(metric => {
      const month: Month = {
        value: metric.mes_numero,
        name: this.convertMonthToSpanish(metric.mes.trim())
      };
      addUniqueMonth(this.MonthList, month);
      

    });
  }

  convertMonthToSpanish(month: string): string {
    switch (month) {
      case "January":
        return "Enero";
      case "February":
        return "Febrero";
      case "March":
        return "Marzo";
      case "April":
        return "Abril";
      case "May":
        return "Mayo";
      case "June":
        return "Junio";
      case "July":
        return "Julio";
      case "August":
        return "Agosto";
      case "September":
        return "Setiembre";
      case "October":
        return "Octubre";
      case "November":
        return "Noviembre";
      default:
        return "Diciembre";
    }
  }

  filtrarPorMes(input: any) {
    if (!input || input.value == "empty") {
      this.actualMetric = this.actualMetric;
      this.SelectedMonth = this.actualMetric?.mes_numero;
    }
    else {
      this.SelectedMonth = input.value;
      console.log(this.SelectedMonth);
      this.actualMetric = this.clientMetrics?.find(x => x.mes_numero == input.value);
      this.processingRequest = false;
    }
  }

  submitMetric(modal :  TemplateRef<void>){
    
    this.registerMetric.id_persona = this.receivedClient.Id;
    this.registerMetric.edad = this.receivedClient.edad;
    this.registerMetric.usuario_modificacion = this.receivedClient.idEntrenador
    if(this.registerMetric.peso != undefined && this.registerMetric.altura != undefined && this.registerMetric.edad != undefined){
      this.registerMetric.imc = (parseFloat(this.registerMetric.peso) / (parseFloat(this.registerMetric.altura) * (parseFloat(this.registerMetric.altura)))).toFixed(2) + '';
      this.registerMetric.grasa = ((1.20 * parseFloat(this.registerMetric.imc)) + (0.23 * parseInt(this.registerMetric.edad)) - 10.8 - 5.4).toFixed(2) + '';
    }

    if(!this.hasMetrics){
      this.registerMetric.consecutivo = 0 + '';
    }
    else{
      if(this.actualMetric != undefined && this.actualMetric.consecutivo != undefined)
      {
        this.registerMetric.consecutivo = parseInt(this.actualMetric.consecutivo) + 1 + ''
      }
      
    }
    this.processingRequest = true;
    this.metricsService.registerMetric(this.registerMetric).pipe().subscribe(
      () => {
        this.openModal(modal);
        setTimeout(() => {
          this.modalRef?.hide();
        }, 2000);
      
        this.onRegisterMetrics = false;
        this.hasMetrics = true;
        this.metricsService.getClientMetrics(this.receivedClient.Id).subscribe(
          (data) => {
            this.clientMetrics = data;
            this.actualMetric = this.clientMetrics.find(metric => metric.estado === "A");
            this.MonthList = [];
            this.populateMonthList(this.clientMetrics);
            this.SelectedMonth = this.actualMetric?.mes_numero;
            this.processingRequest = false;
          },
          (error) => {
            console.log('Error al cargar las metricas:', error);
    
          }
         
    )
  },

      (error) => {
        console.log(error);
      }
    )
  }

  validateForm(){
    if(this.registerMetric.altura != undefined){
      let regex = /^\d(\.\d{2})$/i;
      if(!regex.test(this.registerMetric.altura)){
        this.badHeightFormat = true;
      }
      else{
        this.badHeightFormat = false;
      }
    }


    if(this.registerMetric.peso != undefined){
      if(!this.validateField(this.registerMetric.peso)){
        this.badWeightFormat = true;
      }
      else{
        this.badWeightFormat = false;
      }
    }

    if(this.registerMetric.objetivo != undefined && this.registerMetric.objetivo != ''){
      if(!this.validateField(this.registerMetric.objetivo)){
        this.badIdealWeightFormat = true;
      }
      else{
        this.badIdealWeightFormat = false;
      }
    }
  
      if(this.registerMetric.peso != undefined && this.registerMetric.peso != null &&
        this.registerMetric.altura != undefined && this.registerMetric.altura != null &&
        this.registerMetric.objetivo != '' && this.registerMetric.objetivo != null && 
        this.registerMetric.bicep_derecho != undefined && this.registerMetric.bicep_derecho != null && this.registerMetric.bicep_derecho > 0 &&
        this.registerMetric.bicep_izquierdo != undefined && this.registerMetric.bicep_izquierdo != null && this.registerMetric.bicep_izquierdo > 0 &&
        this.registerMetric.cadera != undefined && this.registerMetric.cadera != null &&  this.registerMetric.bicep_izquierdo > 0 &&
        this.registerMetric.cintura != undefined && this.registerMetric.cintura != null && this.registerMetric.cintura > 0 &&
        this.registerMetric.muslo_izquierdo != undefined && this.registerMetric.muslo_izquierdo != null && this.registerMetric.muslo_izquierdo > 0 &&
        this.registerMetric.muslo_derecho != undefined && this.registerMetric.muslo_derecho != null && this.registerMetric.muslo_derecho > 0 &&
        !this.badHeightFormat && !this.badWeightFormat && !this.badIdealWeightFormat
        
      ){
        this.completedForm = true;
      }
      else{
        this.completedForm = false;
      }

     
    
  }

  validateField(value : string){
    let regex = /^[0-9]{2}(\.\d{2})?$/i;
    if(!regex.test(value)){
      return false;
    }
    else{
      return true;
    }
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 2) {
      input.value = input.value.slice(0, 2);
    }
  
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}





