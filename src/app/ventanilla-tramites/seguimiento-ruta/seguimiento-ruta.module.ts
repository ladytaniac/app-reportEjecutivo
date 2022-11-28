import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguimientoRutaPageRoutingModule } from './seguimiento-ruta-routing.module';

import { SeguimientoRutaPage } from './seguimiento-ruta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguimientoRutaPageRoutingModule
  ],
  declarations: [SeguimientoRutaPage]
})
export class SeguimientoRutaPageModule {}
