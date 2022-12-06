import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigDatosApp } from 'src/configuracion/config';
import { EjecucionPresupuestariaService } from 'src/app/servicios/ejecucion-presupuestaria.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {
  @ViewChild('pieChart') pieChart;
  pies: any;
  colorArray: any;

  labelsPie = [];
  dataPie = [];
  lstGastos = [];
  lstTotal;
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
        const secrelista = data['response'].inversion;
        var auxLista = [];
        var auxLabelEnd = [];
        var auxLabelMontoEnd = [];

        secrelista.forEach((valor)=>{
          var auxDevengado =  parseFloat(this.HtmlEncode(valor['devengado']));
          var auxPagado = parseFloat(this.HtmlEncode(valor['pagado']));
          var auxPresupuesto= parseFloat(this.HtmlEncode(valor['presupuesto']));
          var auxCaldo_x_pagar= parseFloat(this.HtmlEncode(valor['saldo_x_pagar']));
          var auxSaldo_ppto = parseFloat(this.HtmlEncode(valor['saldo_ppto']));
          if(valor['tipo_inversion'] != 'Total general'){
            var porcentaje = ((auxDevengado*100)/auxPresupuesto).toFixed(2);
            
            const objSecretaria = {
              devengado: valor['devengado'],
              id_z_ejecucion_inversion: valor['id_z_ejecucion_inversion'],
              pagado: valor['pagado'],
              porcentaje: porcentaje,
              presupuesto: valor['presupuesto'],
              saldo_ppto: valor['saldo_ppto'],
              saldo_x_pagar: valor['saldo_x_pagar'],
              tipo_inversion: valor['tipo_inversion']
            };
  
            auxLista.push(objSecretaria);
          }
          if(valor['tipo_inversion'] == 'Total general') {
            
            var porcentajeTotal = ((valor['devengado']*100)/valor['presupuesto']).toFixed(2);
            
            const objSecretaria = {
              devengado: valor['devengado'],
              id_z_ejecucion_inversion: valor['id_z_ejecucion_inversion'],
              pagado: valor['pagado'],
              porcentaje: porcentajeTotal,
              presupuesto: valor['presupuesto'],
              saldo_ppto: valor['saldo_ppto'],
              saldo_x_pagar: valor['saldo_x_pagar'],
              tipo_inversion: valor['tipo_inversion']
            };
            auxLista.push(objSecretaria);

            var newPorcentaje = parseFloat(porcentajeTotal).toFixed(0);
            auxLabelEnd.push('Inversión');
            auxLabelEnd.push('Devengado');
            let restantePorcentaje = 100 - Number(newPorcentaje);
            auxLabelMontoEnd.push(Number(newPorcentaje));
            auxLabelMontoEnd.push(restantePorcentaje);
          }
        });
        this.labelsPie = auxLabelEnd;
        this.dataPie = auxLabelMontoEnd;

        this.lstGastos = auxLista;
        this.createPieChart(this.labelsPie, this.dataPie);     
      }
    });
  }

  convert_to_float(a) {
    var floatValue = parseFloat(a.replace(/, /, '.'));
    return floatValue;
  }

  HtmlEncode(s){
    return s.replace(/\./g,"").replace(/\,/g,".");
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
    });
  }
  goBack() {
    this.router.navigate(['/ejecucion-presupuestaria']);
  }
}