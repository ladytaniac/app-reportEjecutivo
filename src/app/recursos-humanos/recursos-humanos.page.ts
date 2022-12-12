import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigDatosApp } from '../../configuracion/config';

interface SelectItem {
  valor: number;
  name: string;
}
@Component({
  selector: 'app-recursos-humanos',
  templateUrl: './recursos-humanos.page.html',
  styleUrls: ['./recursos-humanos.page.scss'],
})
export class RecursosHumanosPage implements OnInit {
  constructor(
    private router: Router,
    private config: ConfigDatosApp,
  ) { }

  ngOnInit() {
    this.config.setMenuSelect(this.config._RECURSOSHUMANOS);
    window.dispatchEvent(new CustomEvent('menu'));
  }

  verVacantes() {
    this.router.navigateByUrl('/recursos-humanos/vacantes');
  }
  verNuevoPersonal() {
    this.router.navigateByUrl('/recursos-humanos/nuevo-personal');
  }
  verPersonal() {
    this.router.navigateByUrl('/recursos-humanos/personal');
  }

  goBack() {
    this.router.navigate(['/servicios']);
  }
}