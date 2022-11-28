import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ModalController } from '@ionic/angular';
import { ModalLogueoPage } from '../modal-logueo/modal-logueo.page';
@Component({
  selector: 'app-inicio-access',
  templateUrl: './inicio-access.page.html',
  styleUrls: ['./inicio-access.page.scss'],
})
export class InicioAccessPage implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private platform: Platform,
  ) { }

  ngOnInit() {
  }

  mostrarRegistro(){
    this.router.navigateByUrl('/register-user');
  }
  mostrarTramites() {
    this.router.navigateByUrl('/servicios');
  }

  private async mostrarLogueo(){
    const modal= await this.modalCtrl.create({
      component: ModalLogueoPage
    });
    modal.onDidDismiss().then((logueo)=>{
      if (logueo['data']) {
        window.dispatchEvent(new CustomEvent('user:login'));
        this.router.navigateByUrl('/servicios');
      }
    });
    return await modal.present();
  }

}
