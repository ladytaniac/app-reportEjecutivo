import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigDatosApp } from 'src/configuracion/config';
import { environment } from '@env/environment';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-atenciones',
  templateUrl: './atenciones.page.html',
  styleUrls: ['./atenciones.page.scss'],
})
export class AtencionesPage implements OnInit {
  @ViewChild('barChart') barChart;
  @ViewChild('pieChart') pieChart;
  bars: any;
  pies: any;
  colorArray: any;
  URL = environment.apiCentralLlamadas;
  form: FormGroup;
  myDate: String = new Date().toISOString();
  atencionLlamadas: number = 0;
  atencionWhatssap: number = 0;
  atencionTotal: number = 0;

  tcasoMotivos = [];
  tcasoCantidad = [];

  tatencionNombre = [];
  tatencionValor = [];

  constructor(
    private router: Router,
    private fbuilder: FormBuilder,
    private httpClient: HttpClient,
    private config: ConfigDatosApp,
  ) { }

  ngOnInit() {
    this.formulario();
    this.inicioTipoAtencion();
    this.inicioTipoCaso();
    this.inicioTotales();
    this.config.setMenuSelect(this.config._ATENCION);
    window.dispatchEvent(new CustomEvent('menu'));
  }
  ionViewDidEnter() {
    // this.createBarChart(this.tcasoMotivos, this.tcasoCantidad);
  }
  formulario() {
    this.form = this.fbuilder.group({
      fecha_ini: [''],
      fecha_fin: [''],
    });
  }

  filtrar() {
    var dateInicio = this.form.get('fecha_ini').value.split('T')[0];
    var dateFin = this.form.get('fecha_fin').value.split('T')[0];
    if (this.bars) {
      this.bars.destroy();
    }
    if (this.pies) {
      this.pies.destroy();
    }
    this.totales(dateInicio, dateFin);
    this.tipoCaso(dateInicio, dateFin);
    this.tipoAtencion(dateInicio, dateFin);
  }
  inicioTotales() {
    var API_URL = this.URL + 'cuadro-general';
    let formData: any = new FormData();
    formData.append('fecha_ini', '');
    formData.append('fecha_fin', '');
    this.httpClient.post(API_URL, formData).subscribe((data) => {
      if (data['status'] == true) {
        this.atencionLlamadas = data['response'].total_llamadas;
        this.atencionWhatssap = data['response'].total_what;
        this.atencionTotal = this.atencionLlamadas + this.atencionWhatssap;
      }
    });
  }
  totales(fechaini, fechafin) {
    var API_URL = this.URL + 'cuadro-general';
    let formData: any = new FormData();
    formData.append('fecha_ini', fechaini);
    formData.append('fecha_fin', fechafin);
    this.httpClient.post(API_URL, formData).subscribe((data) => {
      if (data['status'] == true) {
        this.atencionLlamadas = data['response'].total_llamadas;
        this.atencionWhatssap = data['response'].total_what;
        this.atencionTotal = this.atencionLlamadas + this.atencionWhatssap;
      }
    });
  }
  inicioTipoCaso() {
    var API_URL = this.URL + 'tipo-caso';
    let formData: any = new FormData();
    formData.append('fecha_ini', '');
    formData.append('fecha_fin', '');
    this.httpClient.post(API_URL, formData).subscribe((data) => {
      if (data['status'] == true) {
        this.tcasoMotivos = JSON.parse(data['response'].motivos);
        this.tcasoCantidad = JSON.parse(data['response'].cantidad);
        this.createBarChart(this.tcasoMotivos, this.tcasoCantidad);
      }
    });
  }

  tipoCaso(fechaini, fechafin) {
    var API_URL = this.URL + 'tipo-caso';
    let formData: any = new FormData();
    formData.append('fecha_ini', fechaini);
    formData.append('fecha_fin', fechafin);
    this.httpClient.post(API_URL, formData).subscribe((data) => {
      if (data['status'] == true) {
        this.tcasoMotivos = JSON.parse(data['response'].motivos);
        this.tcasoCantidad = JSON.parse(data['response'].cantidad);
        this.createBarChart(this.tcasoMotivos, this.tcasoCantidad);
      }
    });
  }
  //Valores por defecto
  inicioTipoAtencion() {
    var API_URL = this.URL + 'medio-atencion';
    let formData: any = new FormData();
    formData.append('fecha_ini', '');
    formData.append('fecha_fin', '');
    this.httpClient.post(API_URL, formData).subscribe((data) => {
      if (data['status'] == true) {
        this.tatencionNombre = JSON.parse(data['response'].canal);
        this.tatencionValor = JSON.parse(data['response'].tipo);
        this.createPieChart(this.tatencionNombre, this.tatencionValor);
      }
    });
  }

  tipoAtencion(fechaini, fechafin) {
    var API_URL = this.URL + 'medio-atencion';
    let formData: any = new FormData();
    formData.append('fecha_ini', fechaini);
    formData.append('fecha_fin', fechafin);
    this.httpClient.post(API_URL, formData).subscribe((data) => {
      if (data['status'] == true) {
        this.tatencionNombre = JSON.parse(data['response'].canal);
        this.tatencionValor = JSON.parse(data['response'].tipo);
        this.createPieChart(this.tatencionNombre, this.tatencionValor);
      }
    });
  }

  createBarChart(listlabel, listcantidad) {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: listlabel,
        datasets: [
          {
            label: 'Tipo de casos',
            data: listcantidad,
            backgroundColor: [
              'rgb(0, 152, 119, 1)',
              'rgba(72, 39, 120, 1)',
              'rgba(241, 135, 33, 1)',
            ],
            borderColor: [
              'rgb(0, 152, 119, 0.2)',
              'rgba(72, 39, 120, 0.2)',
              'rgba(241, 135, 33, 0.2)',
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }

  createPieChart(listlabel, listcantidad) {
    this.pies = new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: listlabel,
        datasets: [
          {
            label: 'Tipo de casos',
            data: listcantidad,
            backgroundColor: [
              'rgb(0, 152, 119, 1)',
              'rgba(72, 39, 120, 1)',
              'rgba(241, 135, 33, 1)',
            ],
            borderColor: [
              'rgb(0, 152, 119, 0.2)',
              'rgba(72, 39, 120, 0.2)',
              'rgba(241, 135, 33, 0.2)',
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }

  goBack() {
    this.router.navigate(['/servicios']);
  }

  get fecha_ini() {
    return this.form.get('fecha_ini');
  }
  get fecha_fin() {
    return this.form.get('fecha_fin');
  }
}