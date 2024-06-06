import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MiPlanService } from './miPlan.service';
import { MiPlan } from './model/miPlan.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mi-plan',
  templateUrl: './mi-plan.component.html',
  styleUrls: ['./mi-plan.component.css'],
})
export class MiPlanComponent implements OnInit {

  public processingRequest = true;

  dni: string | null = null;

  dias: any[] = [];

  constructor(private route: ActivatedRoute, private miPlanService: MiPlanService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dni = params.get('dni');
    });

    if (this.dni) {
      this.miPlanService.listMiPlan(this.dni).subscribe(() => {
        this.organizarDatos();
        this.processingRequest = false;
      });
    }
  }

  get miPlan(): MiPlan[] {
    return this.miPlanService.miPlanList;
  }

  organizarDatos() {
    const diasUnicos = Array.from(new Set(this.miPlan.map(item => item.dia))).sort();
    this.dias = diasUnicos.map(dia => {
      return {
        dia,
        ejercicios: this.miPlan.filter(item => item.dia === dia)
      };
    });
  }
}