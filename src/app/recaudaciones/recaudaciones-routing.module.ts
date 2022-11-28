import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecaudacionesPage } from './recaudaciones.page';

const routes: Routes = [
  {
    path: '',
    component: RecaudacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecaudacionesPageRoutingModule {}
