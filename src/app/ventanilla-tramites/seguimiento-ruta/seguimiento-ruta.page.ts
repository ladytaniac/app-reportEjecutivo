import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { AtlasService } from 'src/app/servicios/atlas.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-seguimiento-ruta',
  templateUrl: './seguimiento-ruta.page.html',
  styleUrls: ['./seguimiento-ruta.page.scss'],
})
export class SeguimientoRutaPage implements OnInit {
  informacion;
  lstSeguimiento = [];
  
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private httpClient: HttpClient,
    private srvAtlas: AtlasService
  ) {
    this.informacion = this.navParams.get('sch');
  }

  ngOnInit() {
    this.verSeguimiento();
  }

  verSeguimiento() {
    const infoSend = {'gestion':this.informacion['gestion'],'numero':this.informacion['nro']};
    this.srvAtlas.getSeguimientoHojaRuta(infoSend).subscribe( data=> {
      if(data['status'] == true) {
        var seguimientos = data['response'];
        // console.log('this.lstSeguimiento=', this.lstSeguimiento);
        var auxLista= [];
        seguimientos.forEach(dato => {
          const objSeguimiento = 
          { 
            a: dato['a'],
            asunto: dato['asunto'],
            de: dato['de'],
            fecha: dato['fecha'].split(" ")[0],
            fecha_recepcion: dato['fecha_recepcion']
          };
          auxLista.push(objSeguimiento);
        })
        this.lstSeguimiento = auxLista;
      }
    });
  }
  async closeModal() {
    await this.modalController.dismiss();
  }
}