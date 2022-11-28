import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowPdfPage } from './show-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: ShowPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowPdfPageRoutingModule {}
