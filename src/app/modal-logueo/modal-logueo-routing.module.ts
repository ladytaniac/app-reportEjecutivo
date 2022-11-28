import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalLogueoPage } from './modal-logueo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalLogueoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalLogueoPageRoutingModule {}
