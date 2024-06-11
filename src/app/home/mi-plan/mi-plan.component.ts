import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MiPlanService } from './miPlan.service';
import { MiPlan } from './model/miPlan.interface';
import { Location } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mi-plan',
  templateUrl: './mi-plan.component.html',
  styleUrls: ['./mi-plan.component.css'],
})
export class MiPlanComponent implements OnInit {

  modalRef: BsModalRef | null = null;

  public processingRequest = true;

  dni: string | null = null;

  dias: any[] = [];

  //Atributos QR
  public currentUrl: string = '';
  public processingUrlRequest: boolean = false;
  public qrUrl: string = '';

  constructor(private route: ActivatedRoute, private miPlanService: MiPlanService, private location: Location, private modalService: BsModalService, private httpClient: HttpClient) {

    this.currentUrl = this.location.path();

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

  openModal(ModalQR: TemplateRef<any>) {
    this.modalRef = this.modalService.show(ModalQR, {});
    this.obtenerQR();
  }

  closeModal() {
    if (this.modalRef) {  // Comprueba si modalRef es no nulo antes de llamar a hide
      this.modalRef.hide();
    }
  }

  obtenerQR() {


    const apiUrl: string = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';

    const pageurl: string = 'https://omodygym.netlify.app';
    //const pageurl: string = 'http://localhost:4200';

    const url = `${apiUrl}${pageurl}${this.currentUrl}`;

    this.qrUrl = url;


  }






}
