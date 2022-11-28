import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtencionesPageRoutingModule } from './atenciones-routing.module';

import { AtencionesPage } from './atenciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AtencionesPageRoutingModule
  ],
  declarations: [AtencionesPage]
})
export class AtencionesPageModule {}
