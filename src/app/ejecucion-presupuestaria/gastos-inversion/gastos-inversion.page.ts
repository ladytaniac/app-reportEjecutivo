import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigDatosApp } from 'src/configuracion/config';
import { EjecucionPresupuestariaService } from 'src/app/servicios/ejecucion-presupuestaria.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-gastos-inversion',
  templateUrl: './gastos-inversion.page.html',
  styleUrls: ['./gastos-inversion.page.scss'],
})
export class GastosInversionPage implements OnInit {
  @ViewChild('barChart') barChart;
  bars: any;
  colorArray: any;
  
  labelsPie = [];
  dataPie = [];
  lstGastos = [];
  lstTotal = [];
  constructor(
    private router: Router,
    private config: ConfigDatosApp,
    private srvEjePresupuestaria: EjecucionPresupuestariaService
  ) { }

  ngOnInit() {
    this.getInformacion();
    this.config.setMenuSelect(this.config._ATENCION);
    window.dispatchEvent(new CustomEvent('menu'));
  }

  getInformacion() {
    this.srvEjePresupuestaria.getEjecucionPresopuestaria().subscribe(data=>{
      console.log('data=', data);
      if (data['status'] == true) {
        const secrelista = data['response'].secretaria;
        var totales = data['response'].resumen[0];
        var auxTotalDevengado = parseFloat(this.HtmlEncode(totales['devengado']));
        var auxTotalPptoVigente = parseFloat(this.HtmlEncode(totales['ppto_vigente_ejec']));
        var porcentajeTotal= ((auxTotalDevengado*100)/auxTotalPptoVigente).toFixed(2);

        const objTotales = {
          num_ejec: totales['num_ejec'],
          ppto_vigente_ejec: totales['ppto_vigente_ejec'],
          porcentaje: porcentajeTotal,
          devengado: totales['devengado'],
          saldo_ppto: totales['saldo_ppto'],
          num_sn_ejec: totales['num_sn_ejec'],
          ppto_vigente_sn_ejec: totales['ppto_vigente_sn_ejec'],
        };

        // this.lstTotal = data['response'].resumen[0];
        this.lstTotal.push(objTotales);
        console.log('secrelista=', secrelista);
        console.log('totales=', this.lstTotal);
        var auxLista = [];
        var auxLabelEnd = [];
        var auxLabelMontoEnd = [];

        secrelista.forEach((valor)=>{
          var auxDpto_vigente =  parseFloat(this.HtmlEncode(valor['ppto_vigente']));
          var auxDevengado = parseFloat(this.HtmlEncode(valor['devengado']));
          var auxSaldo_ppto = parseFloat(this.HtmlEncode(valor['saldo_ppto']));
          
          var porcentaje = ((auxDevengado*100)/auxDpto_vigente).toFixed(2);
          
          const objSecretaria = {
            secretaria: valor['secretaria'],
            num: valor['num'],
            ppto_vigente: valor['ppto_vigente'],
            porcentaje: porcentaje,
            devengado: valor['devengado'],
            saldo_ppto: valor['saldo_ppto']
          };

          auxLista.push(objSecretaria);

          if(valor['secretaria'] != 'Total general') {
            auxLabelEnd.push(valor['secretaria']);
            auxLabelMontoEnd.push(valor['num']);
          }
        });
        this.labelsPie = auxLabelEnd;
        this.dataPie = auxLabelMontoEnd;
        this.lstGastos = auxLista;
        this.createBarChart(this.labelsPie, this.dataPie);
      }
    });
  }

  HtmlEncode(s){
    return s.replace(/\./g,"").replace(/\,/g,".");
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
              'rgba(174, 24, 87, 1)',
              'rgba(0, 172, 216, 1)',
            ],
            borderColor: [
              'rgb(0, 152, 119, 0.2)',
              'rgba(72, 39, 120, 0.2)',
              'rgba(241, 135, 33, 0.2)',
              'rgba(174, 24, 87, 0.2)',
              'rgba(0, 172, 216, 0.2)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
            x: {
                display: false
            }
        }
      }
    });
  }
  goBack() {
    this.router.navigate(['/ejecucion-presupuestaria']);
  }
}