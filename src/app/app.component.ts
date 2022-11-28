import { Component } from '@angular/core';
import { ServUserService } from './servicios/serv-user.service';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { ConfigDatosApp } from '../configuracion/config';
import { Network } from '@ionic-native/network/ngx';
import { MensajesService } from './proveedores/mensajes.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  tipoFuncionario;
  DNI;
  DNI_CONF1;
  DNI_CONF2;
  DNI_CONF3;
  private menuSelect: string;
  private iniLogin: boolean;
  private nombreCompleto: string;
  private unidad: string;
  private avatar: string;
  private httpOptions: object;
  constructor(
    private userSrv: ServUserService,
    private router: Router,
    private alerta: AlertController,
    private platform: Platform,
    private config: ConfigDatosApp,
    private network: Network,
    private msjSrv: MensajesService,
    private httpClient: HttpClient
  ) {
    this.iniLogin = false;
    this.avatar = 'assets/imgs/principales/alcaldecbba.jpg';
    this.DNI_CONF1 = this.config.getDniAlcalde();
    this.DNI_CONF2 = this.config.getDniSecretario();
    this.DNI_CONF3 = this.config.getDniOtherPerson();
  }
  ngOnInit() {
    this.iniAppConfig();
    this.inicioDeEventos();
    this.statusNetwork();
  }
  private inicioDeEventos(): void {
    window.addEventListener('user:logout', () => {
      this.logout();
    });
    window.addEventListener('user:login', () => {
      this.iniLogin = true;
      this.DNI = this.config.session['dni'];
      
      if(this.DNI == this.DNI_CONF1) {
        this.avatar = 'assets/imgs/principales/alcaldecbba.jpg';
      } else {
        this.avatar = 'assets/imgs/principales/usuario.png';
      }
      this.nombreCompleto = this.config.session['nombre'];
      this.unidad = this.config.session['unidad'];
      this.tipoFuncionario = this.config.session['tipo_user'];
    });
    window.addEventListener('menu', () => {
      this.menuSelect = this.config.getMenuSelect();
    });
  }

  private iniAppConfig(): void {
    this.platform.ready().then(_ => {
      if (this.platform.is('android')) {
        this.config.set_tipo_plataforma('android');
      } else if (this.platform.is('ios')) {
        this.config.set_tipo_plataforma('ios');
      }
    });
  }
  private statusNetwork(): void {
    this.network.onDisconnect().subscribe(_ => {
      this.msjSrv.mostrarToast("Conexión de internet interrumpida.");
    });
    this.network.onConnect().subscribe(_ => {
      this.msjSrv.ocultarToast();
    });
  }
  private async logout() {
    const alertaVentana = await this.alerta.create({
      header: "Atención",
      message: "Desea cerrar sesión",
      buttons: [
        {
          text: "cancelar",
          role: "cancel"
        }, {
          text: "Cerrar sesión",
          handler: () => {
            var acceso = this.config.session['access_token'];
            // logout BDs
            this.httpOptions = {
              headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + acceso
              })
            };
            this.userSrv.logoutUser().then(() => {
              this.router.navigateByUrl('/');
              this.iniLogin = false;
              this.config.session={};
            });
          }
        }
      ]
    })
    await alertaVentana.present();
  }
}