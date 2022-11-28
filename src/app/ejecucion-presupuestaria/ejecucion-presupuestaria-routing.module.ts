import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EjecucionPresupuestariaPage } from './ejecucion-presupuestaria.page';

const routes: Routes = [
  {
    path: '',
    component: EjecucionPresupuestariaPage
  },
  {
    path: 'gastos',
    loadChildren: () => import('./gastos/gastos.module').then( m => m.GastosPageModule)
  },
  {
    path: 'gastos-inversion',
    loadChildren: () => import('./gastos-inversion/gastos-inversion.module').then( m => m.GastosInversionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EjecucionPresupuestariaPageRoutingModule {}
