import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastosInversionPage } from './gastos-inversion.page';

const routes: Routes = [
  {
    path: '',
    component: GastosInversionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GastosInversionPageRoutingModule {}
