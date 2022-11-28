import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss'],
})
export class MenuUsuarioComponent implements OnInit {

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}
  private usuarioPreferencias():void {
    this.popoverController.dismiss();
  }
  private cerrarSesion():void {
    window.dispatchEvent(new CustomEvent('user:logout'));
    this.popoverController.dismiss();
  }
}
