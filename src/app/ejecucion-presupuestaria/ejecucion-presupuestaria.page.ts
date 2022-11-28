import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigDatosApp } from '../../configuracion/config';

@Component({
  selector: 'app-ejecucion-presupuestaria',
  templateUrl: './ejecucion-presupuestaria.page.html',
  styleUrls: ['./ejecucion-presupuestaria.page.scss'],
})
export class EjecucionPresupuestariaPage implements OnInit {

  constructor(
    private router: Router,
    private config: ConfigDatosApp,
  ) { }

  ngOnInit() {
    this.config.setMenuSelect(this.config._EJECUCIONPRESUPUESTARIA);
    window.dispatchEvent(new CustomEvent('menu'));
  }

  verGastos() {
    this.router.navigateByUrl('/ejecucion-presupuestaria/gastos');
  }
  verGastosInversion() {
    this.router.navigateByUrl('/ejecucion-presupuestaria/gastos-inversion');
  }

  goBack() {
    this.router.navigate(['/servicios']);
  }

}