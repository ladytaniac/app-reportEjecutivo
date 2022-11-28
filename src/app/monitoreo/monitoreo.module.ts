import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitoreoPageRoutingModule } from './monitoreo-routing.module';

import { MonitoreoPage } from './monitoreo.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MonitoreoPageRoutingModule
  ],
  declarations: [MonitoreoPage]
})
export class MonitoreoPageModule {}
