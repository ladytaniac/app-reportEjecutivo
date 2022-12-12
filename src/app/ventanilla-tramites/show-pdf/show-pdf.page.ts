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
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

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
  extToMimes = [
    { ext: 'pdf', MType: 'application/pdf' }
  ]
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
    private androidPermissions: AndroidPermissions
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
      console.log('dataDirectory funciona=', this.file.dataDirectory);
      console.log('directorio=', this.config.getDirectorio());
      console.log('externalRootDirectory=', this.file.externalRootDirectory); // hacer funcionar
      console.log('externalDataDirectory=', this.file.externalDataDirectory);
      console.log('externalCacheDirectory=', this.file.externalCacheDirectory);

      //this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
        .then((result) => {
          if (result.hasPermission) {
            console.log('Nuestro código');

            let fileName: string = new Date().toLocaleDateString();
            console.log('namefile=', fileName);

      

            
            // descarga de archivos
            fileTransfer.download(url, this.file.dataDirectory + 'file.pdf', true).then((data)=> {      
              console.log('download complete: ' + data.toURL());
              // this.msjSrv.mostrarAlerta("Descarga exitosa","La hoja de rutas se descargó en la carpeta de descargas. Nombre: "+ 'file'+'.pdf');
              this.msjSrv.mostrarAlerta("Descarga exitosa","Ubicación del archivo: "+ data.toURL());
      
            },(err)=>{
              this.msjSrv.ocultarCargando();
              console.log(err);
            })

          } else {
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(result => {
              if (result.hasPermission) {
                console.log('hasPermission');
              }
            });
          }
        },
        err => {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
        });
    
      
      /*fileTransfer.download(url, this.file.externalRootDirectory + 'file.pdf', true).then((data)=> {      
        console.log('download complete: ' + data.toURL());
        this.msjSrv.mostrarAlerta("Descarga exitosa","La hoja de rutas se descargó en la carpeta de descargas. Nombre: "+ 'file'+'.pdf');

      },(err)=>{
        this.msjSrv.ocultarCargando();
        console.log(err);
      })*/
      
    } else {
      // Descargamos modo escritorio
      this.actualpath.download(`pdf-info.pdf`);
    }
  }

  getMimeByExt(name: any) {
    var extention = name.split('.').pop();
    for (let i = 0; i < this.extToMimes.length; i++) {
      const element = this.extToMimes[i];
      if (element.ext == extention) {
        return element.MType;
      }
    }
  }

  async closeModal() {
    await this.modalController.dismiss();
    // this.router.navigate(['/ventanilla-tramites']);
  }
}