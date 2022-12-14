import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-graphic-list',
  templateUrl: './graphic-list.page.html',
  styleUrls: ['./graphic-list.page.scss'],
})
export class GraphicListPage implements OnInit {
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
    var info = this.navParams.get('graphics');
    this.nombre = info['name'];
    this.lstGraphis = info['data'];
    this.filterData = this.lstGraphis;
  }

  ngOnInit() {
    this.formulario();
  }

  ionViewDidEnter() {
    this.setFilteredGraphics();
  }

  formulario() {
    this.form = this.fbuilder.group({
      busqueda: ["", [Validators.required]],
    });
  }

  setFilteredGraphics() {
    if(this.form.get('busqueda').value != ''){
      this.filterData = this.lstGraphis.filter(current => {
        return (current['nombre_proyecto'].toLowerCase().indexOf(this.form.get('busqueda').value.toLowerCase()) >-1)
      });
    } else {
      this.filterData = this.lstGraphis;
    }
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}