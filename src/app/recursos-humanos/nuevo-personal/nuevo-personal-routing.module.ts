import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoPersonalPage } from './nuevo-personal.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoPersonalPage
  },
  {
    path: 'modal-imagen',
    loadChildren: () => import('./modal-imagen/modal-imagen.module').then( m => m.ModalImagenPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoPersonalPageRoutingModule {}
