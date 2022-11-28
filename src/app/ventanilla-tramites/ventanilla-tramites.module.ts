import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentanillaTramitesPageRoutingModule } from './ventanilla-tramites-routing.module';

import { VentanillaTramitesPage } from './ventanilla-tramites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VentanillaTramitesPageRoutingModule
  ],
  declarations: [VentanillaTramitesPage]
})
export class VentanillaTramitesPageModule {}
