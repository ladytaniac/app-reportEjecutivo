import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-servicios',
  templateUrl: './menu-servicios.page.html',
  styleUrls: ['./menu-servicios.page.scss'],
})
export class MenuServiciosPage implements OnInit {
  private textSearh: string;
  private paginas: object[];
  private paginasBackup: object[];
  constructor() { 
    this.paginas=[
      {"nombre":"Reserva de campos deportivos", "descripcion":"Descripción del sitio de la alcaldía", "ruta":"/historial", "img":"assets/imgs/reserva-de-campos-deportivos.png"},
      {"nombre":"Servicio de estacionamiento", "descripcion":"Descripción del sitio de la alcaldía asdfasd asd adsfasd", "ruta":"/servicio-estacionamiento", "img":"assets/imgs/servicio-de-estacionamiento.png"},
      {"nombre":"Consulta tus deudas", "descripcion":"Descripción del sitio de la alcaldía", "ruta":"/patentes", "img":"assets/imgs/consulta-tus-deudas.png"},
      {"nombre":"Infracciones pendientes", "descripcion":"Descripción del sitio de la alcaldía", "ruta":"/infracciones-pendientes", "img":"assets/imgs/infracciones-pendientes.png"}
    ];
    this.paginasBackup= this.paginas;
  }

  ngOnInit() {
  }
  private buscarTexto(event){
    const buscar= event.srcElement.value;
    if (!buscar) {
      this.paginas= this.paginasBackup;
      return;
    }
    this.paginas= this.paginas.filter(current=>{
      if(current['nombre'] && buscar){
        return (current['nombre'].toLowerCase().indexOf(buscar.toLowerCase()) > -1);
      }
    })
  }
}
