import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigDatosApp } from '../../configuracion/config';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {
  tipoFuncionario;
  DNI;
  DNI_CONF1;
  DNI_CONF2;
  DNI_CONF3;

  constructor(
    private router: Router,
    private config: ConfigDatosApp,
  ) {
    this.tipoFuncionario = this.config.session['tipo_user'];
    this.config.setMenuSelect(this.config._SERVICIOS);
    window.dispatchEvent(new CustomEvent('menu'));
    this.DNI = this.config.session['dni'];
    this.DNI_CONF1 = this.config.getDniAlcalde();
    this.DNI_CONF2 = this.config.getDniSecretario();
    this.DNI_CONF3 = this.config.getDniOtherPerson();
  }

  ngOnInit() {
  }
  mostrarRRHH() {
    this.router.navigateByUrl('/recursos-humanos');
  }
  recaudaciones() {
    this.router.navigateByUrl('/recaudaciones');
  }
  monitoreo() {
    this.router.navigateByUrl('/monitoreo');
  }
  atenciones() {
    this.router.navigateByUrl('/atencion');
  }
  proyecto() {
    this.router.navigateByUrl('/proyectos');
  }
  ejecucionPresupuestaria() {
    this.router.navigateByUrl('/ejecucion-presupuestaria');
  }
  ventanillaTramites() {
    this.router.navigateByUrl('/ventanilla-tramites');
  }
}