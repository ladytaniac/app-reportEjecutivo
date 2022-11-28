import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { TituloComponent } from './titulo/titulo.component';
import { BotonComponent } from './boton/boton.component';


@NgModule({
  declarations: [
    CabeceraComponent,
    TituloComponent,
    BotonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CabeceraComponent,
    TituloComponent,
    BotonComponent
  ]
})
export class ComponentesModule { }
