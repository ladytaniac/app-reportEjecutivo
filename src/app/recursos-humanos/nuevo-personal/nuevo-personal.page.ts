import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { environment } from '@env/environment';

import { ModalImagenPage } from './modal-imagen/modal-imagen.page';

interface SelectItem {
  valor: number;
  name: string;
}
@Component({
  selector: 'app-nuevo-personal',
  templateUrl: './nuevo-personal.page.html',
  styleUrls: ['./nuevo-personal.page.scss'],
})
export class NuevoPersonalPage implements OnInit {
  bars: any;
  pies: any;
  colorArray: any;
  URL = environment.apiRepEjecutivo;
  form: FormGroup;
  formsearch: FormGroup;
  showInfo: boolean = false;
  funcionarios = [];
  filterData = [];
  seleccionado = 2;
  mensaje;
  lstItem = [
    { valor: 3, name: 'Nombre' },
    { valor: 4, name: 'Primer Ape.' },
    // { valor: 1, name: 'Item' },
    { valor: 2, name: 'Unidad' },
    { valor: 5, name: 'Cargo' },
  ];
  constructor(
    private router: Router,
    private fbuilder: FormBuilder,
    private httpClient: HttpClient,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.formulario();
    this.formularioBusqueda();
  }

  ionViewDidEnter() {
    this.setFilteredLocations();
  }

  formulario() {
    this.form = this.fbuilder.group({
      fecha_ini: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
    });
  }
  formularioBusqueda() {
    this.formsearch = this.fbuilder.group({
      tipo_busq: [this.seleccionado, [Validators.required]],
      busqueda: ["", [Validators.required]],
    });
  }

  filtrar() {
    var API_URL = this.URL + 'utils/request/ingresos_nuevos';
    if(this.form.valid) {
      var dateInicio = this.form.get('fecha_ini').value.split('T')[0];
      var dateFin = this.form.get('fecha_fin').value.split('T')[0];
      let formData: any = new FormData();
      formData.append('fechainicial', dateInicio);
      formData.append('fechafinal', dateFin);
      this.httpClient.post(API_URL, formData).subscribe((data) => {
        console.log('datos=', data);
        if (data['status'] == true) {
          this.showInfo = true;
          this.funcionarios = data['response'];
          this.mensaje = '';
          this.setFilteredLocations();
        } else {
          this.showInfo = false;
          this.mensaje = 'No existen datos registrados en el sistema.'
        }
      });
    }
  }
  compareTipoDocumento(o1: SelectItem, o2: SelectItem) {
    return o1 && o2 ? o1.valor === o2.valor : o1 === o2;
  }
  changeTipoBusq() {
    this.formsearch.get('busqueda').setValue('');
    if(this.formsearch.get('busqueda').value == '') {
      this.filterData = this.funcionarios;
    }
  }

  setFilteredLocations() {
    // busqueda por secretaria
    if(this.formsearch.get('tipo_busq').value == 2) {
      if(this.formsearch.get('busqueda').value != ''){
        this.filterData = this.funcionarios.filter(current => {
          return (current['secretaria'].toLowerCase().indexOf(this.formsearch.get('busqueda').value.toLowerCase()) >-1)
        });
      } if (this.formsearch.get('busqueda').value == '') {
        this.filterData = this.funcionarios;
      }
    }
    // busqueda por nombre
    if(this.formsearch.get('tipo_busq').value == 3) {
      if(this.formsearch.get('busqueda').value != ''){
        this.filterData = this.funcionarios.filter(current => {
          return (current['nombre'].toLowerCase().indexOf(this.formsearch.get('busqueda').value.toLowerCase()) >-1)
        });
      } if (this.formsearch.get('busqueda').value == '') {
        this.filterData = this.funcionarios;
      }
    }
    // busqueda por primer apellido
    if(this.formsearch.get('tipo_busq').value == 4) {
      if(this.formsearch.get('busqueda').value != ''){
        this.filterData = this.funcionarios.filter(current => {
          return (current['paterno'].toLowerCase().indexOf(this.formsearch.get('busqueda').value.toLowerCase()) >-1)
        });
      } if (this.formsearch.get('busqueda').value == '') {
        this.filterData = this.funcionarios;
      }
    }

    // busqueda por primer apellido
    if(this.formsearch.get('tipo_busq').value == 5) {
      if(this.formsearch.get('busqueda').value != ''){
        this.filterData = this.funcionarios.filter(current => {
          return (current['cargo'].toLowerCase().indexOf(this.formsearch.get('busqueda').value.toLowerCase()) >-1)
        });
      } if (this.formsearch.get('busqueda').value == '') {
        this.filterData = this.funcionarios;
      }
    }
  }


  async verImagen(ci) {
    console.log(ci);
    const modal = await this.modalCtrl.create({
      component: ModalImagenPage,
      componentProps: {
        dni: ci
      }
    });
    return await modal.present();
  }
  goBack() {
    this.router.navigate(['/recursos-humanos']);
    this.form.reset();
    this.formsearch.reset();
  }
  get fecha_ini() { return this.form.get('fecha_ini'); }
  get fecha_fin() { return this.form.get('fecha_fin'); }
  get tipo_busq() { return this.formsearch.get('tipo_busq'); }
  get busqueda() { return this.formsearch.get('busqueda'); }
}
