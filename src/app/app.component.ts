import { Component } from '@angular/core';
import { ServUserService } from './servicios/serv-user.service';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { ConfigDatosApp } from '../configuracion/config';
import { Network } from '@ionic-native/network/ngx';
import { MensajesService } from './proveedores/mensajes.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
// import { ConfigDatosApp } from '../../configuracion/config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  tipoFuncionario;
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
      this.nombreCompleto = this.config.session['nombres'];
      this.unidad = this.config.session['unidad'];
      this.tipoFuncionario = this.config.session['tipo_user'];
      this.avatar = 'assets/imgs/principales/alcaldecbba.jpg';
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

            this.httpClient.get(environment.apiCloseSession, this.httpOptions).subscribe(info => {
              console.log(info);
            });

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
  // private select(nombreMenu:string):void{
  //   this.menuSelect=nombreMenu;
  //   if (nombreMenu==='logout') {
  //     this.logout();
  //   }
  // }
}