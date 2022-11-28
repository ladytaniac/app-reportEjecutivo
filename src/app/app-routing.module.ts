import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'modal-logueo',
    loadChildren: () => import('./modal-logueo/modal-logueo.module').then( m => m.ModalLogueoPageModule)
  },
  {
    path: 'inicio-access',
    loadChildren: () => import('./inicio-access/inicio-access.module').then( m => m.InicioAccessPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios-main/servicios.module').then( m => m.ServiciosSemPageModule)
  },
  {
    path: 'recursos-humanos',
    loadChildren: () => import('./recursos-humanos/recursos-humanos.module').then( m => m.RecursosHumanosPageModule)
  },
  {
    path: 'recaudaciones',
    loadChildren: () => import('./recaudaciones/recaudaciones.module').then( m => m.RecaudacionesPageModule)
  },
  {
    path: 'monitoreo',
    loadChildren: () => import('./monitoreo/monitoreo.module').then( m => m.MonitoreoPageModule)
  },
  {
    path: 'atencion',
    loadChildren: () => import('./atenciones/atenciones.module').then( m => m.AtencionesPageModule)
  },  {
    path: 'proyectos',
    loadChildren: () => import('./proyectos/proyectos.module').then( m => m.ProyectosPageModule)
  },
  {
    path: 'ventanilla-tramites',
    loadChildren: () => import('./ventanilla-tramites/ventanilla-tramites.module').then( m => m.VentanillaTramitesPageModule)
  },
  {
    path: 'ejecucion-presupuestaria',
    loadChildren: () => import('./ejecucion-presupuestaria/ejecucion-presupuestaria.module').then( m => m.EjecucionPresupuestariaPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
