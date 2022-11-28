import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastosInversionPageRoutingModule } from './gastos-inversion-routing.module';

import { GastosInversionPage } from './gastos-inversion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GastosInversionPageRoutingModule
  ],
  declarations: [GastosInversionPage]
})
export class GastosInversionPageModule {}
