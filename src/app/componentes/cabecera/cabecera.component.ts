import { Component, Input, OnInit } from '@angular/core';
// import { PopoverController } from '@ionic/angular';
import { MenuUsuarioComponent } from '../menu-usuario/menu-usuario.component';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {
  @Input() titulo: string;
  private txtTitulo: string;
  constructor(
    // private popoverController:PopoverController
  ) { }

  ngOnInit() {
    this.txtTitulo= this.titulo;
  }
  // async settingsPopover(ev: any) {
  //   const siteInfo = { id: 1, name: 'edupala' };
  //   const popover = await this.popoverController.create({
  //     component: MenuUsuarioComponent,
  //     event: ev,
  //     cssClass: 'popover_setting',
  //     componentProps: {
  //       site: siteInfo
  //     },
  //     translucent: true
  //   });

  //   popover.onDidDismiss().then((result) => {
  //     console.log(result.data);
  //   });

  //   return await popover.present();
  // }
}
