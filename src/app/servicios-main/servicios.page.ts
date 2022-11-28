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

  constructor(
    private router: Router,
    private config: ConfigDatosApp,
  ) {
    this.tipoFuncionario = this.config.session['tipo_user'];
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
  ventanillaTramites() {
    this.router.navigateByUrl('/ventanilla-tramites');
  }
}
