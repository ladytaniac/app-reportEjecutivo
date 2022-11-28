import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguimientoRutaPage } from './seguimiento-ruta.page';

const routes: Routes = [
  {
    path: '',
    component: SeguimientoRutaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguimientoRutaPageRoutingModule {}
