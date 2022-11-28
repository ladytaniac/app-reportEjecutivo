import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphicListPage } from './graphic-list.page';

const routes: Routes = [
  {
    path: '',
    component: GraphicListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphicListPageRoutingModule {}
