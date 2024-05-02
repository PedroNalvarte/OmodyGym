import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HomeRoutingModule } from './homerouting.module';
import { VerificarAccesoComponent } from './verificar-acceso/verificar-acceso.component';
import { MiSedeComponent } from './mi-sede/mi-sede.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { RutinasComponent } from './rutinas/rutinas.component';
import { EntrenadorComponent } from './entrenador/entrenador.component';
import { MiPlanComponent } from './mi-plan/mi-plan.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { MiProgresoComponent } from './mi-progreso/mi-progreso.component';
import { SedesComponent } from './sedes/sedes.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { MembresiasComponent } from './membresias/membresias.component';
import { HeaderComponent } from '../shared/pages/header/header.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    InicioComponent,
    PerfilComponent,
    ClientesComponent,
    VerificarAccesoComponent,
    MiSedeComponent,
    EjerciciosComponent,
    RutinasComponent,
    EntrenadorComponent,
    MiPlanComponent,
    EstadisticasComponent,
    MiProgresoComponent,
    SedesComponent,
    ColaboradoresComponent,
    MembresiasComponent
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, FormsModule],
})
export class HomeModule { }
