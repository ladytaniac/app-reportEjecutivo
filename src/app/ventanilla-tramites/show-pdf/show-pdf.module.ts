import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowPdfPageRoutingModule } from './show-pdf-routing.module';

import { ShowPdfPage } from './show-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowPdfPageRoutingModule
  ],
  declarations: [ShowPdfPage]
})
export class ShowPdfPageModule {}
