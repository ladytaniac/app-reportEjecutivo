import { Component, OnInit } from '@angular/core';
import { ConfigDatosApp } from '../../configuracion/config';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { Platform, ModalController } from '@ionic/angular';
import { ModalLogueoPage } from '../modal-logueo/modal-logueo.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  private estadoLogueado: boolean;
  constructor(
    private config: ConfigDatosApp,
    private storage: Storage,
    private router: Router,
    private platform: Platform,
    private modalCtrl: ModalController
  ) {
    this.storage.create();
    this.estadoLogueado= false;
  }

  ngOnInit() {
    setTimeout(() => { this.click(); }, 2000);
  }

  click() {
    if (this.estadoLogueado) {
      this.router.navigateByUrl('/servicios');
    }else{
      this.router.navigateByUrl('/inicio-access');
    }
  }



  private async mostrarLogueo(){
    const modal= await this.modalCtrl.create({
      component: ModalLogueoPage
    });
    modal.onDidDismiss().then((logueo)=>{
      if (logueo['data']) {
        if (this.estadoLogueado) { 
          this.router.navigateByUrl('/servicios');
        }else{
          this.router.navigateByUrl('/inicio-access');
        }
      }
    });
    return await modal.present();
  }
  private mostrarRegistro():void{
    this.router.navigateByUrl('/register-user');
  }
  ionViewDidEnter(){
    this.platform.ready().then(()=>{
      this.storage.get('sesion').then((res)=>{
        if (res!=null) {
          this.config.session=res;
          // console.log('datos guardados: ',res);
          window.dispatchEvent(new CustomEvent('user:login'));
          this.estadoLogueado= true;
        }else{
          this.estadoLogueado= false;
        }
      })
    })
  }
}