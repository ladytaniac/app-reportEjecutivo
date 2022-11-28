import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuServiciosPage } from './menu-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: MenuServiciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuServiciosPageRoutingModule {}
