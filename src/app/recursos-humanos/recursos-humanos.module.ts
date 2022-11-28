import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecursosHumanosPageRoutingModule } from './recursos-humanos-routing.module';

import { RecursosHumanosPage } from './recursos-humanos.page';
import  { NgxDatatableModule }  from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RecursosHumanosPageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [RecursosHumanosPage]
})
export class RecursosHumanosPageModule {}
