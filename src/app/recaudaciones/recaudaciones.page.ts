import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@env/environment';
import { FinanzasService } from '../servicios/finanzas.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-recaudaciones',
  templateUrl: './recaudaciones.page.html',
  styleUrls: ['./recaudaciones.page.scss'],
})
export class RecaudacionesPage implements OnInit {
  @ViewChild('barChart') barChart;
  bars: any;
  URL = environment.apiCentralLlamadas+'mobile/mobile/finanzas';
  lstMeses = [];
  lstPresupuestado = [];
  lstRecaudado = [];
  constructor(
    private router: Router,
    private srvFinanzas: FinanzasService
  ) { }

  ngOnInit() {
    this.finanzas();
  }

  finanzas() {
    var year = new Date().getFullYear();
    this.srvFinanzas.getFinanzas().subscribe(data => {
      if(data['status'] == true) {
        var meses = data['response'].meses;        
        var presupuesto = JSON.parse(data['response'].presupuestado);
        var recaudado = JSON.parse(data['response'].recaudado);
        var name1 = 'Monto presupuestado' + year;
        var name2 = 'Monto recaudado' + year;

        this.createBarChart(meses, presupuesto, recaudado, name1, name2);
      }
    });
  }

  createBarChart(ltslabel, ltsdata1, lstdata2, nombre1, nombre2) {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ltslabel,
        datasets: [
          {
            label: nombre1,
            data: ltsdata1,
            backgroundColor: 'rgb(0, 152, 119)',
            borderColor: 'rgb(79, 185, 168)',
            borderWidth: 1
          },
          {
            label: nombre2,
            data: lstdata2,
            backgroundColor: 'rgb(72, 39, 120)',
            borderColor: 'rgb(109, 86, 160)',
            borderWidth: 1
          }
        ]
      },
    });
  }

  goBack() {
    this.router.navigate(['/servicios']);
  }
}
