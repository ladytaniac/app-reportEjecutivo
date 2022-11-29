import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { ServUserService } from '../servicios/serv-user.service';
import { MensajesService } from '../proveedores/mensajes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfigDatosApp } from '../../configuracion/config';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { environment } from '@env/environment';

@Component({
  selector: 'app-modal-logueo',
  templateUrl: './modal-logueo.page.html',
  styleUrls: ['./modal-logueo.page.scss'],
})
export class ModalLogueoPage implements OnInit{
  UniqueDeviceID:string;
  accessRE:boolean = false;
  private httpOptions: object;
  private submitted: boolean;
  private logueo: LogueoDatos;
  // private readonly _R_EMAIL: RegExp=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  constructor(
    private srvUser: ServUserService,
    private msjSrv: MensajesService,
    private config: ConfigDatosApp,
    private storage: Storage,
    private modalCtrl: ModalController,
    private httpClient: HttpClient,
    private platform: Platform,
    private uniqueDeviceID: UniqueDeviceID,
  ) {
    this.storage.create();
    this.logueo= {mail:{valor:"",validez:""},pass:{valor:"",validez:""}};
    this.submitted= false;
  }
  ngOnInit() {
    this.getUniqueDeviceID();
  }
  ionViewDidEnter(){
    this.getUniqueDeviceID();
  }
  ingresar(form:NgForm){
    let URL = environment.loginURL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    this.submitted=true;
    if (form.valid) {
      if (this.logueo.mail.validez=="" && this.logueo.pass.validez=="") {
        let formData: any = new FormData();
        formData.append("user", this.logueo.mail.valor);
        formData.append("password", this.logueo.pass.valor);

        this.msjSrv.mostrarCargando("Autenticando ...");
        this.httpClient.post(URL, formData).subscribe(data => {
          if(data['status'] == true) {
            this.config.session=data;
            this.config.session["nombre"]=data['response'].user.nombre_completo;
            this.config.session["dni"]=data['response'].user.dni;
            this.config.session["rol"]=data['response'].user.nombre_rol;
            this.config.session["id_user"]=data['response'].user.id_usuario;
            this.config.session["ui_device"]=this.UniqueDeviceID;
            this.storage.set('session',this.config.session);
            this.modalCtrl.dismiss(true);
            this.msjSrv.ocultarCargando();
          } else {
            this.msjSrv.mostrarAlerta('Verificación', 'Usted no puede acceder a la información. Su usuario i/o contraseña son incorrectos.');
            this.msjSrv.ocultarCargando();
          }
        }, error=> {
          this.msjSrv.mostrarAlerta(error.error.data, "correo o contraseña incorrectos");
        });
      }
    }
  }
  getUniqueDeviceID() {
    if (this.platform.is('cordova')) {
      const acceso = this.config.arrayIdAccess;
      this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log('unique device=', uuid);
        this.UniqueDeviceID = uuid;

        const found = acceso.find(x=> x === this.UniqueDeviceID);
        if(found == undefined) {
          this.accessRE = true;
          this.msjSrv.mostrarAlerta("Verificar","Su id: "+this.UniqueDeviceID + " no es permitido para esta aplicación.");
        } else {
          this.accessRE = false;
        }
      })
      .catch((error: any) => {
        console.log(error);
        this.UniqueDeviceID = "Error! ${error}";
      });
    } else {
      this.accessRE = false;
    }
  }
  verificar() {
    const acceso = this.config.arrayIdAccess;
    if (this.platform.is('cordova')) {
      // ** sin unique device ***
      // this.accessRE = false;

      // ** con unique device **
      const found = acceso.find(x=> x === this.UniqueDeviceID);
      if(found == undefined) {
        this.accessRE = true;
        this.msjSrv.mostrarAlerta("Verificar","Su id: "+this.UniqueDeviceID + " no es permitido para esta aplicación.");
      } else {
        this.accessRE = false;
        this.msjSrv.mostrarAlerta("Confirmado",this.UniqueDeviceID);
      }
    } else {
      this.accessRE = false;
    }
  }
  private cancelar():void{
    this.modalCtrl.dismiss();
  }
}
interface LogueoDatos {
  mail:Datos,
  pass:Datos
}
interface Datos {
  valor?: string,
  validez?: string
}