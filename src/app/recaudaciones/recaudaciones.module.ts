import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecaudacionesPageRoutingModule } from './recaudaciones-routing.module';

import { RecaudacionesPage } from './recaudaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecaudacionesPageRoutingModule
  ],
  declarations: [RecaudacionesPage]
})
export class RecaudacionesPageModule {}
