import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platform, ModalController } from '@ionic/angular';
import { environment } from '@env/environment';
import { ChartOptions, ChartType,  } from 'chart.js';
import { MensajesService } from '../proveedores/mensajes.service';
import { InfoListPage } from './info-list/info-list.page';
import { ConfigDatosApp } from 'src/configuracion/config';
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
  URL_MONITOREOLIST = environment.apiMonitoreoTendencia + '/get-list-tendencia';
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
    private modalCtrl: ModalController,
    private config: ConfigDatosApp,
  ) { }

  ngOnInit() {
    this.formulario();
    this.config.setMenuSelect(this.config._MONITOREO);
    window.dispatchEvent(new CustomEvent('menu'));
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
          borderWidth: 1
        }]
      },
      options: {
        onClick: (e, activeEls) => {
          if (activeEls.length != 0) {
            var dataIndex = activeEls[0].index; // index barra
            var estadoselect = e['chart'].data.labels[dataIndex]; // nombre del estado
            var fecha =  this.form.get('fecha_submit').value.split('T')[0];
            // console.log('fecha=', fecha);
            /*let graphics = {
              "tendencia": estadoselect,
              "fecha": 'INFORMACION',
            }
            setTimeout(() => { this.monitoreoList(graphics); }, 1500);*/

            let formData: any = new FormData();
            formData.append('fecha', fecha);
            formData.append('tendencia', estadoselect);

            this.httpClient.post(this.URL_MONITOREOLIST, formData).subscribe((data) => {
              // console.log('data=', data);
              if (data['status'] == true) {
                let monitoreo = {
                  "name": estadoselect,
                  "data": data['response'].reporte,
                }
                // console.log('monitoreo=', monitoreo);
                setTimeout(() => { this.monitoreoList(monitoreo); }, 1500);
              }
            });
          }
        }
      }
    });
  }
  private async monitoreoList(info){
    const modal= await this.modalCtrl.create({
      component: InfoListPage,
      componentProps: {
        informacion: info
      }
    });
    return await modal.present();
  }

  get fecha_submit() { return this.form.get('fecha_submit'); }
}