import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from "@angular/common/http";
import { Router } from '@angular/router';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { ConfigDatosApp } from 'src/configuracion/config';
import { MensajesService } from '../../proveedores/mensajes.service';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


@Component({
  selector: 'app-show-pdf',
  templateUrl: './show-pdf.page.html',
  styleUrls: ['./show-pdf.page.scss'],
})
export class ShowPdfPage implements OnInit {
  pathGoogle = 'https://docs.google.com/gview?url=';
  pathEmbedded = '&embedded=true';
  actualpath;
  pathFile;
  constructor(
    private router: Router,
    private navParams: NavParams,
    private modalController: ModalController,
    private sanitized: DomSanitizer,
    private httpClient: HttpClient,
    public  sanitizer:DomSanitizer,
    private file: File,
    private fileOpener: FileOpener,
    private plt: Platform,
    private config: ConfigDatosApp,
    private msjSrv: MensajesService,
    private transfer: FileTransfer,
  ) { 
    this.actualpath = this.navParams.get('url');
    var nuevopath = this.pathGoogle + this.actualpath + this.pathEmbedded;
    this.pathFile = nuevopath;
  }

  ngOnInit() {
  }

  descargar() {
    console.log('click=', this.actualpath);
    console.log(this.actualpath);
    const fileTransfer: FileTransferObject = this.transfer.create();
    if (this.plt.is('cordova')) {
      let url = encodeURI(this.actualpath);
      // this.file.dataDirectory
      console.log('datadirecrtory=', this.file.dataDirectory);
      console.log('directorio=', this.config.getDirectorio());

      
      fileTransfer.download(url, this.file.dataDirectory + 'file.pdf', true).then((data)=> {      
        console.log('download complete: ' + data.toURL());
      },(err)=>{
        this.msjSrv.ocultarCargando();
        console.log(err);
      })




      
      /*
      fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
        console.log('download complete: ' + entry.toURL());
      }, (error) => {
        // handle error
      });



      this.actualpath.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        this.file.writeFile(this.config.getDirectorio(), 'pdf-'+'download'+'.pdf', blob, { replace: true }).then((fileEntry) => {
          this.msjSrv.mostrarAlerta("Descarga exitosa","La hoja de rutas se descargó en la carpeta de descargas. Nombre: "+ 'pdf-'+'download'+'.pdf');
          this.fileOpener.open(this.config.getDirectorio() + 'pdf-'+'download'+'.pdf', 'application/pdf');
        })
      });*/
    } else {
      // Descargamos modo escritorio
      this.actualpath.download(`pdf-info.pdf`);
    }
  }

  async closeModal() {
    await this.modalController.dismiss();
    // this.router.navigate(['/ventanilla-tramites']);
  }
}