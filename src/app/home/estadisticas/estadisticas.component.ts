import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { MiProgresoService } from './miProgreso.service';
import { MisMetricas } from './model/misMetricas.interface';
import { MetricsService } from '../clientes/pages/page-client-metrics/metrics.service';
import { Metric } from '../clientes/pages/models/metrics-interface';
import { Month } from '../clientes/pages/models/months.interface';

@Component({
  selector: 'estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent {
  clientMetrics? : Metric[];
  actualMetric? : Metric;
  SelectedMonth?: number;
  MonthList: Month[] = [];
  public processingRequest = true;
  public noMetrics = false;
  dni: string = '';
  public id = 0;
  private subscription: Subscription;
  public onHistory = false;
  public mensajeImc = "";
  constructor(private authService: AuthService, private miProgresoService: MiProgresoService, private metricsService : MetricsService) {

    this.subscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.dni = user.dni;
      } else {
        this.dni = 'No disponible';
      }
    });
  }

  ngOnInit(): void {
    this.miProgresoService.listMiPerfil(this.dni).subscribe(data => {

        if(data.length != 0){
          this.id = parseInt(data[0].id_persona); 

          this.metricsService.getClientMetrics(this.id).subscribe(
            (data) => {
              
              this.clientMetrics = data;
              if(this.clientMetrics.length == 0){
                this.processingRequest = false;
                this.noMetrics = true;
              }
              this.actualMetric = this.clientMetrics.find(metric => metric.estado === "A");
              this.populateMonthList(this.clientMetrics);
              this.popularInfoExtra();
              this.SelectedMonth = this.actualMetric?.mes_numero;
              this.processingRequest = false;
              
          },
            (error) => {
              console.log('Error al cargar las metricas:', error);
      
            }
          );
        }
        else{
          this.processingRequest = false;
          this.noMetrics = true;
        }
        
      });
    
    
   
  }
popularInfoExtra(){
  if(this.clientMetrics != undefined){
    this.clientMetrics.forEach(metric => {
      if(metric.meta == 'P'){
        metric.meta = 'Bajar de Peso';
      }
      else if(metric.meta == 'T'){
        metric.meta = 'Tonificar';
      }
      else{
        metric.meta = 'Aumentar masa';
      }

      if(metric.imc != undefined){
        if(parseInt(metric.imc) < 18.5){
          metric.mensajeIMC = "Su imc es de " + metric.imc + ", lo que indica que su peso esta en la categoría de peso bajo para adultos de su estatura"
        }
        else if(parseInt(metric.imc) < 24.9){
          metric.mensajeIMC = "Su imc es de " + metric.imc + ", lo que indica que su peso esta en la categoría de peso normal para adultos de su estatura"

        }
        else if(parseInt(metric.imc) < 29.9){
          metric.mensajeIMC = "Su imc es de " + metric.imc + ", lo que indica que su peso esta en la categoría de sobrepeso para adultos de su estatura"
        }
        else{
          metric.mensajeIMC = "Su imc es de " + metric.imc + ", lo que indica que su peso esta en la categoría de obesidad para adultos de su estatura"
        }
      }

      if(metric.peso != undefined && metric.altura != undefined && metric.edad != undefined){
          var bmr = 10 * parseFloat(metric.peso) + 6.25 * (parseFloat(metric.altura) * 100) - 5 * parseInt(metric.edad) + 5;
          var cal = (bmr * 1.2).toFixed(0);

          metric.mensajeCal = "Debes consumir un aproximado de " + cal + " calorias diaras para facilitar tu proceso";

      }

    });
  } 
}
  get misMetricas(): MisMetricas[] {
    return this.miProgresoService.miProgreso;
  }


  toHistory(){
    this.onHistory = true;
  }
  Back(){
    this.onHistory = false;
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

}
