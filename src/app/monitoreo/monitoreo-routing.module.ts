import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitoreoPage } from './monitoreo.page';

const routes: Routes = [
  {
    path: '',
    component: MonitoreoPage
  },
  {
    path: 'info-list',
    loadChildren: () => import('./info-list/info-list.module').then( m => m.InfoListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoreoPageRoutingModule {}
