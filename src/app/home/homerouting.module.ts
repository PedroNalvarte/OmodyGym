import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VerificarAccesoComponent } from './verificar-acceso/verificar-acceso.component';
import { MiSedeComponent } from './mi-sede/mi-sede.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { RutinasComponent } from './rutinas/rutinas.component';
import { EntrenadorComponent } from './entrenador/entrenador.component';
import { MiPlanComponent } from './mi-plan/mi-plan.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { MiProgresoComponent } from './mi-progreso/mi-progreso.component';
import { hasRoleGuard } from '../auth/guards/has-role.guard';
import { SedesComponent } from './sedes/sedes.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { MembresiasComponent } from './membresias/membresias.component';
const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'inicio',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Administrador', 'Recepcionista', 'Entrenador', 'Cliente']
        },
        component: InicioComponent
      },
      {
        path: 'perfil',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Administrador', 'Recepcionista', 'Entrenador', 'Cliente']
        },
        component: PerfilComponent
      },
      {
        path: 'clientes',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Administrador', 'Recepcionista', 'Entrenador']
        },
        component: ClientesComponent
      },
      {
        path: 'verificarAcceso',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Recepcionista']
        },
        component: VerificarAccesoComponent
      },
      {
        path: 'miSede',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Recepcionista']
        },
        component: MiSedeComponent
      },
      {
        path: 'ejercicios',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Entrenador', 'Administrador']
        },
        component: EjerciciosComponent
      },
      {
        path: 'rutinas',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Entrenador']
        },
        component: RutinasComponent
      },
      {
        path: 'entrenador',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Cliente']
        },
        component: EntrenadorComponent
      },
      {
        path: 'miPlan',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Cliente']
        },
        component: MiPlanComponent
      },
      {
        path: 'estadisticas',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Cliente']
        },
        component: EstadisticasComponent
      },
      {
        path: 'miProgreso',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Cliente']
        },
        component: MiProgresoComponent
      },
      {
        path: 'sedes',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Administrador']
        },
        component: SedesComponent
      },
      {
        path: 'colaboradores',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Administrador']
        },
        component: ColaboradoresComponent
      },
      {
        path: 'membresias',
        canActivate: [hasRoleGuard],
        canLoad: [hasRoleGuard],
        data: {
          allowedRoles: ['Administrador']
        },
        component: MembresiasComponent
      },
      {
        path: 'miPlan/:dni',
        // canActivate: [hasRoleGuard],
        // canLoad: [hasRoleGuard],
        // data: {
        //   allowedRoles: ['Administrador', 'Recepcionista', 'Entrenador', 'Cliente']
        // },
        component: MiPlanComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
