import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-list',
  templateUrl: './info-list.page.html',
  styleUrls: ['./info-list.page.scss'],
})
export class InfoListPage implements OnInit {
  nombre;
  lstGraphis = [];
  filterData = [];
  form: FormGroup;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private httpClient: HttpClient,
    private fbuilder: FormBuilder,
  ) {
    var info = this.navParams.get('informacion');
    this.nombre = info['name'];
    this.lstGraphis = info['data'];
    this.lstGraphis.forEach((valor)=>{
      valor['detalle']=this.HtmlEncode(valor['detalle']);
    })
    this.filterData = this.lstGraphis;
  }
  ngOnInit() {
    this.formulario();
  }

  ionViewDidEnter() {
    this.setFilteredGraphics();
    this.filterData = this.lstGraphis;
    this.lstGraphis.forEach((valor)=>{
      valor['detalle']=this.HtmlEncode(valor['detalle']);
    })
    this.filterData = this.lstGraphis;
  }

  formulario() {
    this.form = this.fbuilder.group({
      busqueda: ["", [Validators.required]],
    });
  }

  HtmlEncode(s){
    return s.replace(/\nbsp;/gi,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/(<(.*?)>|&\w+;)/g,'').replace(/nbsp;/g,'').replace(/iacute;/g, 'í')
    .replace(/ntilde;/g, 'ñ').replace(/aacute;/g, 'á').replace(/oacute;/g, 'ó').replace(/uacute;/g, 'ú').replace(/eacute;/g, 'é').replace(/hellip;/g, '...')
    .replace(/ldquo;/g, '').replace(/rdquo;/g, '');
  }

  setFilteredGraphics() {
    if(this.form.get('busqueda').value != ''){
      this.filterData = this.lstGraphis.filter(current => {
        return (current['tema'].toLowerCase().indexOf(this.form.get('busqueda').value.toLowerCase()) >-1)
      });
    } else {
      this.filterData = this.lstGraphis;
    }
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}