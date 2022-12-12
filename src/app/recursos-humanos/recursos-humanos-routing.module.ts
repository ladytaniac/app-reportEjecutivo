import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecursosHumanosPage } from './recursos-humanos.page';

const routes: Routes = [
  {
    path: '',
    component: RecursosHumanosPage
  },
  {
    path: 'vacantes',
    loadChildren: () => import('./vacantes/vacantes.module').then( m => m.VacantesPageModule)
  },
  {
    path: 'nuevo-personal',
    loadChildren: () => import('./nuevo-personal/nuevo-personal.module').then( m => m.NuevoPersonalPageModule)
  },  {
    path: 'personal',
    loadChildren: () => import('./personal/personal.module').then( m => m.PersonalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecursosHumanosPageRoutingModule {}
