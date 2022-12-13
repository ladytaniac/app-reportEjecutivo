import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from "@angular/common/http";
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
  constructor(
    private router: Router,
    private navParams: NavParams,
    private modalController: ModalController,
    private sanitized: DomSanitizer,
    private httpClient: HttpClient,
    public sanitizer: DomSanitizer,
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

  async descargar() {
    let fecha = new Date();
    let time = fecha.getTime();
    const fileTransfer: FileTransferObject = this.transfer.create();
    if (this.plt.is('cordova')) {
      let path = await this.getDownloadPath();
      let uri = encodeURI(this.actualpath); 
      let fullFileName = 'archivo_'+time+'.pdf';
     
      // descarga de archivos
      fileTransfer.download(uri, path + fullFileName, false).then((data) => {
        console.log('download complete: ' + data.toURL());
        this.msjSrv.mostrarAlerta("Descarga exitosa", "Ubicación del archivo: " + data.toURL());

      }, (err) => {
        this.msjSrv.ocultarCargando();
        console.log(err);
      })
    } else {
      // Descargamos modo escritorio
      this.actualpath.download(`pdf-info.pdf`);
    }
  }

  async getDownloadPath() {
    if (this.plt.is('ios')) {
        return this.file.documentsDirectory;
    }

    // To be able to save files on Android, we first need to ask the user for permission. 
    // We do not let the download proceed until they grant access
    await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
          result => {
              if (!result.hasPermission) {
                  return this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
              }
          }
    );
  
    return this.file.externalRootDirectory + "/Download/";
  }

  async closeModal() {
    await this.modalController.dismiss();
    // this.router.navigate(['/ventanilla-tramites']);
  }
}