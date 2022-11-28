import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoPersonalPageRoutingModule } from './nuevo-personal-routing.module';

import { NuevoPersonalPage } from './nuevo-personal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NuevoPersonalPageRoutingModule,
  ],
  declarations: [NuevoPersonalPage]
})
export class NuevoPersonalPageModule {}
