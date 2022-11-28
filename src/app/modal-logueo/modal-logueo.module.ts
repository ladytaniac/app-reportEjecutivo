import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalLogueoPageRoutingModule } from './modal-logueo-routing.module';

import { ModalLogueoPage } from './modal-logueo.page';
import { ComponentesModule } from '../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    ModalLogueoPageRoutingModule
  ],
  declarations: [ModalLogueoPage]
})
export class ModalLogueoPageModule {}
