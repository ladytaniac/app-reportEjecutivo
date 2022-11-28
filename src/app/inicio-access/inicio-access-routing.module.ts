import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioAccessPage } from './inicio-access.page';

const routes: Routes = [
  {
    path: '',
    component: InicioAccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioAccessPageRoutingModule {}
