import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { ChartOptions, ChartType,  } from 'chart.js';
import { MensajesService } from '../proveedores/mensajes.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.page.html',
  styleUrls: ['./monitoreo.page.scss'],
})
export class MonitoreoPage implements OnInit {

  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;
  URL = environment.apiMonitoreo;
  lstMonitoreo = [];
  form: FormGroup;
  myDate: String = new Date().toISOString();
  total: number = 0;
  porcentaje: string = '';
  showDatos = false;

  labelsBarChart= [];
  dataBarChart=[];

  constructor(
    private router: Router,
    private fbuilder: FormBuilder,
    private httpClient: HttpClient,
    private msjSrv: MensajesService,
  ) { }

  ngOnInit() {
    this.formulario();
  }

  ionViewDidEnter() {
    // this.createBarChart();
  }

  formulario() {
    this.form = this.fbuilder.group({
      fecha_submit: ["", [Validators.required]],
    });
  }
  goBack() {
    this.router.navigate(['/servicios']);
  }

  buscar() {
    var dateFormat = this.form.get('fecha_submit').value.split('T')[0];
    let formData: any = new FormData();
    formData.append("fecha_submit", dateFormat);
    var auxArray = [];
    var auxLabelArray = [];
    var auxMontoArray = [];
    if (this.bars) {
      this.bars.destroy();
    }
    this.httpClient.post(this.URL, formData).subscribe(data => {
      if(data['status'] == true) {
        this.showDatos = true;
        var montoTotal = parseInt(data['response']['tendencia_uno'][0].total) + parseInt(data['response']['tendencia_dos'][0].total) + parseInt(data['response']['tendencia_tres'][0].total);

        var porcentajeUno = ( parseInt(data['response']['tendencia_uno'][0].total) * 100 ) / montoTotal;
        const objUno = {
          nombre: data['response']['tendencia_uno'][0].nombre_tendencia,
          monto: parseInt(data['response']['tendencia_uno'][0].total),
          porcentaje: porcentajeUno.toFixed(2),
        };
        auxArray.push(objUno);
        auxLabelArray.push(data['response']['tendencia_uno'][0].nombre_tendencia);
        auxMontoArray.push(parseInt(data['response']['tendencia_uno'][0].total));

        var porcentajeDos = ( parseInt(data['response']['tendencia_dos'][0].total) * 100 ) / montoTotal;
        const objDos = {
          nombre: data['response']['tendencia_dos'][0].nombre_tendencia,
          monto: parseInt(data['response']['tendencia_dos'][0].total),
          porcentaje: porcentajeDos.toFixed(2),
        };
        auxArray.push(objDos);
        auxLabelArray.push(data['response']['tendencia_dos'][0].nombre_tendencia);
        auxMontoArray.push(parseInt(data['response']['tendencia_dos'][0].total));

        var porcentajeTres = ( parseInt(data['response']['tendencia_tres'][0].total) * 100 ) / montoTotal;
        const objTres = {
          nombre: data['response']['tendencia_tres'][0].nombre_tendencia,
          monto: parseInt(data['response']['tendencia_tres'][0].total),
          porcentaje: porcentajeTres.toFixed(2),
        };
        auxArray.push(objTres);
        auxLabelArray.push(data['response']['tendencia_tres'][0].nombre_tendencia);
        auxMontoArray.push(parseInt(data['response']['tendencia_tres'][0].total));

        this.lstMonitoreo = auxArray;
        this.labelsBarChart = auxLabelArray;
        this.dataBarChart = auxMontoArray;

        this.total = montoTotal;
        this.porcentaje = '100 %';

        this.createBarChart(this.labelsBarChart, this.dataBarChart);
      } else {
        this.msjSrv.mostrarAlerta('Verificación', 'No existen datos para la fecha'+ dateFormat + '.');
      }
    });
  }

  createBarChart(ltslabel, ltsdata) {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ltslabel,
        datasets: [{
          label: 'Tipo de tendencias',
          data: ltsdata,
          backgroundColor: ['rgb(0, 152, 119, 1)', 'rgba(72, 39, 120, 1)', 'rgba(241, 135, 33, 1)'],
          borderColor: ['rgb(0, 152, 119, 0.2)', 'rgba(72, 39, 120, 0.2)', 'rgba(241, 135, 33, 0.2)'],
          /* backgroundColor: 'rgb(0, 152, 119)',
          borderColor: 'rgb(79, 185, 168)',*/
          borderWidth: 1
        }]
      },
    });
  } 

  get fecha_submit() { return this.form.get('fecha_submit'); }
}
