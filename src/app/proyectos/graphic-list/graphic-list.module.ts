import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphicListPageRoutingModule } from './graphic-list-routing.module';

import { GraphicListPage } from './graphic-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphicListPageRoutingModule
  ],
  declarations: [GraphicListPage]
})
export class GraphicListPageModule {}
