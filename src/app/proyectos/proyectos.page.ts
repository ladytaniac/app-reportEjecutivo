import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { MensajesService } from '../proveedores/mensajes.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProyectosService } from '../servicios/proyectos.service';
import { Platform, ModalController } from '@ionic/angular';
import { GraphicListPage } from './graphic-list/graphic-list.page';
import { ConfigDatosApp } from 'src/configuracion/config';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})
export class ProyectosPage implements OnInit {
  @ViewChild('barChart') barChart;
  bars: any;

  URL = environment.apiProyectos + '/obtain-graphics';
  URL_GRAPHICLIST = environment.apiProyectos + '/graphic-list';
  form: FormGroup;
  myDate: String = new Date().toISOString();
  tipoProyecto: string = 'TODOS';
  lstDistrito:any[]=[];
  lstTipoProj= [];
  lstOtb= [];

  presupuestoVigente = '';
  montoEjecutivo = '';
  porcentajeEjecutado = '';
  distritoActual = '';

  labelsBarChart= [];
  dataBarChart=[];

  constructor(
    private router: Router,
    private fbuilder: FormBuilder,
    private httpClient: HttpClient,
    private msjSrv: MensajesService,
    private proyectSrv: ProyectosService,
    private modalCtrl: ModalController,
    private config: ConfigDatosApp,
  ) { }

  ngOnInit() {
    this.proyectosSeleccionar();
    this.formulario();
    this.grafica();
    this.config.setMenuSelect(this.config._PROYECTOS);
    window.dispatchEvent(new CustomEvent('menu'));
  }

  proyectosSeleccionar() {
    this.proyectSrv.getObtainSelect().subscribe(data => {
      if(data['status'] == true) {
        var auxDistrito = [];
        var auxTipoProj = [];
        // Distrito
        let ObjDistrito = data['response'].distritos;
        let claves = Object.keys(ObjDistrito); // Devuelve las llaves 1, 3, 5
        for(let i=0; i< claves.length; i++){
          let distData = {
            "id": claves[i],
            "name": ObjDistrito[claves[i]],
          }
          auxDistrito.push(distData);
        }

        // Tipo proyecto
        let ObjTipoProj = data['response'].tipo_proy;
        let clavestp = Object.keys(ObjTipoProj); // Devuelve las llaves 1, 3, 5
        for(let i=0; i< clavestp.length; i++){
          let distTipop = {
            "id": clavestp[i],
            "name": ObjTipoProj[clavestp[i]],
          }
          auxTipoProj.push(distTipop);
        }
        this.lstDistrito = auxDistrito
        this.lstTipoProj = auxTipoProj;
      }
    })
  }

  formulario() {
    this.form = this.fbuilder.group({
      distrito: [""],
      otb: [""],
      tip_proy: [""],
    });
  }

  changeGrafica() {    
    if (this.bars) {
      this.bars.destroy();
    }
    // CAMBIO DE DISTRITO
    if(this.distritoActual != this.form.get('distrito').value) {
      this.distritoActual = this.form.get('distrito').value;
      this.lstOtb = [];
      this.form.get('tip_proy').setValue('');
      this.form.get('otb').setValue('');
      this.form.get('tip_proy').setValue('');
    }

    if(this.form.get('distrito').value != '') {
      let formData: any = new FormData();
      formData.append('distrito', parseInt(this.form.get('distrito').value));
      formData.append('tip_proy', this.form.get('tip_proy').value);
      formData.append('otb', this.form.get('otb').value);
      this.httpClient.post(this.URL, formData).subscribe((data) => {
        if (data['status'] == true) {
          this.presupuestoVigente = data['response'].pres_vig;
          this.montoEjecutivo = data['response'].mnt_ejec;
          this.porcentajeEjecutado = data['response'].financiero;
  
          // grafica
          let graficCant = data['response'].cantidades;
          let graficEsta = data['response'].estados;
          this.dataBarChart = JSON.parse(graficCant);
          this.labelsBarChart = JSON.parse(graficEsta);
  
          this.createBarChart(this.labelsBarChart, this.dataBarChart);    
  
          var auxOtb = [];
          let ObjOTB = data['response'].otbs;
          let claveotb = Object.keys(ObjOTB);
          for(let i=0; i< claveotb.length; i++){
            let distData = {
              "id": claveotb[i],
              "name": ObjOTB[claveotb[i]],
            }
            auxOtb.push(distData);
          }
          this.lstOtb = auxOtb;
        }
      }); 
    } else {
      if (this.bars) {
        this.bars.destroy();
      }
      let formData: any = new FormData();
      formData.append('distrito', '');
      formData.append('tip_proy', '');
      formData.append('otb', '');
      this.httpClient.post(this.URL, formData).subscribe((data) => {
        if (data['status'] == true) {
          this.presupuestoVigente = data['response'].pres_vig;
          this.montoEjecutivo = data['response'].mnt_ejec;
          this.porcentajeEjecutado = data['response'].financiero;
        }
        // grafica
        let graficCant = data['response'].cantidades;
        let graficEsta = data['response'].estados;
        this.dataBarChart = JSON.parse(graficCant);
        this.labelsBarChart = JSON.parse(graficEsta);

        this.createBarChart(this.labelsBarChart, this.dataBarChart);
      });
    }
  }

  grafica() {
    let formData: any = new FormData();
    formData.append('distrito', this.form.get('distrito').value);
    formData.append('tip_proy', this.form.get('tip_proy').value);
    formData.append('otb', this.form.get('otb').value);
    this.httpClient.post(this.URL, formData).subscribe((data) => {
      if (data['status'] == true) {
        this.presupuestoVigente = data['response'].pres_vig;
        this.montoEjecutivo = data['response'].mnt_ejec;
        this.porcentajeEjecutado = data['response'].financiero;
        this.distritoActual = this.form.get('distrito').value;

        // grafica
        let graficCant = data['response'].cantidades;
        let graficEsta = data['response'].estados;
        this.dataBarChart = JSON.parse(graficCant);
        this.labelsBarChart = JSON.parse(graficEsta);
        var formSelect = this.form.value;
        this.createBarChart(this.labelsBarChart, this.dataBarChart);
      }
    });
  }

  createBarChart(ltslabel, ltsdata) {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ltslabel,
        datasets: [{
          label: 'Estado de proyecto',
          data: ltsdata,
          backgroundColor: ['rgb(0, 152, 119, 1)', 'rgba(72, 39, 120, 1)', 'rgba(241, 135, 33, 1)', 'rgba(174, 24, 87, 1)'],
          borderColor: ['rgb(0, 152, 119, 0.2)', 'rgba(72, 39, 120, 0.2)', 'rgba(241, 135, 33, 0.2)', 'rgba(174, 24, 87, 0.2)'],
          borderWidth: 1
        }]
      },
      options: {
        onClick: (e, activeEls) => {

          if (activeEls.length != 0) {
            var dataIndex = activeEls[0].index; // index barra
            var estadoselect = e['chart'].data.labels[dataIndex]; // nombre del estado
            var distrito =  this.form.get('distrito').value;
            var tip_proy = this.form.get('tip_proy').value;
            var otb = this.form.get('otb').value;

            let formData: any = new FormData();
            formData.append('distrito', distrito);
            formData.append('tip_proy', tip_proy);
            formData.append('otb', otb);
            formData.append('estado', estadoselect);

            this.httpClient.post(this.URL_GRAPHICLIST, formData).subscribe((data) => {
              if (data['status'] == true) {
                let graphics = {
                  "name": estadoselect,
                  "data": data['response'].proyectos,
                }
                setTimeout(() => { this.graphicList(graphics); }, 1500);
              }
            });
          }
        }
      }
    });
  }

  private async graphicList(info){
    const modal= await this.modalCtrl.create({
      component: GraphicListPage,
      componentProps: {
        graphics: info
      }
    });
    return await modal.present();
  }
  goBack() {
    this.router.navigate(['/servicios']);
  }

  get distrito() { return this.form.get('distrito'); }
  get otb() { return this.form.get('otb'); }
  get tip_proy() { return this.form.get('tip_proy'); }
}