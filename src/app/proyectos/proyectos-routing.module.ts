import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProyectosPage } from './proyectos.page';

const routes: Routes = [
  {
    path: '',
    component: ProyectosPage
  },
  {
    path: 'graphic-list',
    loadChildren: () => import('./graphic-list/graphic-list.module').then( m => m.GraphicListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectosPageRoutingModule {}
