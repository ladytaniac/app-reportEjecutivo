import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private isLoading:boolean;
  constructor(
    private toast: ToastController,
    private alerta: AlertController,
    private cargando: LoadingController
  ) { }
  async mostrarToast(mensaje:string){
    const msjToast=await this.toast.create({
      message: mensaje
    });
    msjToast.present();
  }
  async mostrarToastTime(mensaje:string, tiempo:number){
    const msjToast=await this.toast.create({
      message: mensaje,
      duration: tiempo
    });
  }
  ocultarToast(){
    this.toast.dismiss();
  }
  async mostrarAlerta(titulo:string, mensaje:string){
    const msjAlerta=await this.alerta.create({
      header: titulo,
      message: mensaje,
      buttons: [{text:'Aceptar',cssClass:'cancel'}],
      cssClass: 'msjStyle'
    });
    await msjAlerta.present();
  }
  async mostrarCargando(mensaje: string="Cargando ..."){
    this.isLoading=true;
    return await this.cargando.create({
      message: mensaje,
      spinner: 'circles',
      cssClass: 'msjStyle'
    }).then(a=>{
      a.present().then(()=>{
        if (!this.isLoading) {
          a.dismiss().then(()=>console.log("salio del loading"));
        }
      });
    });
  }
  async ocultarCargando(){
    this.isLoading=false;
    return await this.cargando.getTop().then(a=>{
      if (a) {
        a.dismiss().then(()=>console.log('loading dismessed'));
      }
    })
  }
}
