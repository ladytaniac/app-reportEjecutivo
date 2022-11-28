import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EjecucionPresupuestariaPageRoutingModule } from './ejecucion-presupuestaria-routing.module';

import { EjecucionPresupuestariaPage } from './ejecucion-presupuestaria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EjecucionPresupuestariaPageRoutingModule
  ],
  declarations: [EjecucionPresupuestariaPage]
})
export class EjecucionPresupuestariaPageModule {}
