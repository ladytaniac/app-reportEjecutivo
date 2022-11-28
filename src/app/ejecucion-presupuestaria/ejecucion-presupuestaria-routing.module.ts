import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EjecucionPresupuestariaPage } from './ejecucion-presupuestaria.page';

const routes: Routes = [
  {
    path: '',
    component: EjecucionPresupuestariaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EjecucionPresupuestariaPageRoutingModule {}
