import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentanillaTramitesPage } from './ventanilla-tramites.page';

const routes: Routes = [
  {
    path: '',
    component: VentanillaTramitesPage
  },
  {
    path: 'seguimiento-ruta',
    loadChildren: () => import('./seguimiento-ruta/seguimiento-ruta.module').then( m => m.SeguimientoRutaPageModule)
  },
  {
    path: 'show-pdf',
    loadChildren: () => import('./show-pdf/show-pdf.module').then( m => m.ShowPdfPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentanillaTramitesPageRoutingModule {}
