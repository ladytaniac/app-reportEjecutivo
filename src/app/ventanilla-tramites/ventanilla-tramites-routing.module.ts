import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentanillaTramitesPage } from './ventanilla-tramites.page';

const routes: Routes = [
  {
    path: '',
    component: VentanillaTramitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentanillaTramitesPageRoutingModule {}
