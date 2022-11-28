import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioAccessPageRoutingModule } from './inicio-access-routing.module';

import { InicioAccessPage } from './inicio-access.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioAccessPageRoutingModule
  ],
  declarations: [InicioAccessPage]
})
export class InicioAccessPageModule {}
