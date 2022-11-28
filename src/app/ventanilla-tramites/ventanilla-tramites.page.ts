import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtlasService } from '../servicios/atlas.service';
import { HttpClient } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { Platform, ModalController } from '@ionic/angular';
import { ConfigDatosApp } from 'src/configuracion/config';
import { MensajesService } from '../proveedores/mensajes.service';
import { SeguimientoRutaPage } from './seguimiento-ruta/seguimiento-ruta.page';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AlertController } from '@ionic/angular';
import { DomSanitizer} from '@angular/platform-browser';
import { ShowPdfPage } from './show-pdf/show-pdf.page';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as CryptoJS from 'crypto-js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ventanilla-tramites',
  templateUrl: './ventanilla-tramites.page.html',
  styleUrls: ['./ventanilla-tramites.page.scss'],
})
export class VentanillaTramitesPage implements OnInit {
  form: FormGroup;
  myDate: String = new Date().toISOString();
  mensaje: string = '';
  lstHojaRutas = [];
  lstTipoBusqueda = [
    { id: 'N', nombre: 'Número gral.'},
    { id: 'C', nombre: 'Solicitante'},
    { id: 'I', nombre: 'Intitución'},
    { id: 'A', nombre: 'Asunto'},
    { id: 'B', nombre: 'Beneficiario'}
  ]
  showInfo: boolean = false;
  pdfObject: any;
  pdfBase64: any;
  logoData = null;
  fechaConsulta;
  pdfObj = null;
  lstYears = [];
  activeYear = new Date().getFullYear();
  showArchivo: boolean = false;

  lstHRutaArtchivo = [];
  constructor(
    private router: Router,
    private fbuilder: FormBuilder,
    private srvAtlas: AtlasService,
    private httpClient: HttpClient,
    private file: File,
    private fileOpener: FileOpener,
    private plt: Platform,
    private config: ConfigDatosApp,
    private msjSrv: MensajesService,
    private modalCtrl: ModalController,
    private transfer: FileTransfer,
    public alertController: AlertController,
    public sanitizer: DomSanitizer
  ) {
    this.sanitizer.bypassSecurityTrustResourceUrl(localStorage.getItem("url"));
  }

  ngOnInit() {
    this.config.setMenuSelect(this.config._VENTANILLATRAMITES);
    window.dispatchEvent(new CustomEvent('menu'));
    this.formulario();
    this.loadLocalAssetToBase64();
    const now = new Date();
    const datestring = now.toISOString();
    var fecha = datestring.split('T')[0];

    this.fechaConsulta = fecha.split('-')[2] + '-' + fecha.split('-')[1] + '-' + fecha.split('-')[0];

    const anio = new Date().getFullYear();
    for(var i = 0; i<5; i++)
    { 
      const year = anio - i;
      this.lstYears.push(year);
    }
  }
  formulario() {
    this.form = this.fbuilder.group({
      gestion: [this.activeYear, [Validators.required]],
      tipo: ["N", [Validators.required]],
      dato: ["", [Validators.required]],
    });
  }

  buscar() {
    if(this.form.valid) {
      var listaBusqueda = [];
      this.srvAtlas.getListaTramites(this.form.value).subscribe((data) => {
        if(data['status'] == true) {
          this.showInfo = true;
          this.lstHojaRutas = data['response'];
          var lstNewArchivo = [];
          for(let hruta of this.lstHojaRutas){
            const infoSend = {'gestion':hruta['gestion'],'numero':hruta['nro']};
            this.srvAtlas.getSeguimientoHojaRuta(infoSend).subscribe( datal=> {
              if(data['status'] == true) {
                const datosSeccion = datal['response'];
                const numSec = datosSeccion[0]['num_sec'];
                const infoSec = { 'dato': numSec };
                this.srvAtlas.getArchivosTramites(infoSec).subscribe( dataarc => {
                  if(dataarc['status'] == true) {                
                    const dataArchivo = dataarc['response'];
                    for(let arch of dataArchivo){
                      const infoSend = {'ruta_doc':arch['ruta_doc'],'nombre_doc':arch['nombre_doc']};
                      lstNewArchivo.push(infoSend);
                    }
                  }
                });
              }
            });
            const infoActual = {
              'asunto':hruta['asunto'],
              'fecha':hruta['fecha'],
              'gestion':hruta['gestion'],
              'institucion':hruta['institucion'],
              'nombre':hruta['nombre'],
              'nro':hruta['nro'],
              'archivos':lstNewArchivo,
            };
            listaBusqueda.push(infoActual); 
          }
          this.lstHRutaArtchivo = listaBusqueda;
          this.form.reset();
          this.form.get('tipo').setValue('N');
          this.form.get('gestion').setValue(this.activeYear);
        } else {
          this.showInfo = false;
          this.mensaje = 'Lo siento la hoja de rutas no fue encontrada'
        }
      });
    }
  }
  loadLocalAssetToBase64() {
    this.httpClient.get('./assets/imgs/principales/cocha-rosado.png', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.logoData = reader.result;
        }
        reader.readAsDataURL(res);
      });
  }
  createPDF(info) {
    this.loadLocalAssetToBase64();
    let logo = {};
    logo = { image: this.logoData, width: 130 };
    const pdfDefinition: any = {
      pageSize: { height: 'auto', width: 224 },
      pageMargins: [10, 10, 10, 10],
      content: [
        logo,
        {
          fontSize: 14,
          text: 'HOJA DE RUTAS',
          margin: [0, 10, 0, 0],
          alignment: 'center',
          bold: true,
          color: '#06775c',
        },
        {
          fontSize: 11,
          text: info['nombre'],
          margin: [0, 5, 0, 5],
          alignment: 'center',
          bold: true,
          color: '#482778',
        },
        {
          fontSize: 10,
          text: 'Fecha: '+ this.fechaConsulta,
          margin: [0, 3, 0, 4],
          alignment: 'right',
          bold: true,
        },
        {
          table: {
            widths: ['*', 70],
            body: [
                [
                  {
                    fontSize: 10,
                    border: [false, false, false, false],
                    bold: true,
                    text: 'Nro.: ' + info['nro'],
                    margin: [-5, 5, 0, 0],
                  },
                  {
                    fontSize: 10,
                    border: [false, false, false, false],
                    text: 'Gestión: ' + info['gestion'],
                    margin: [0, 5, -5, 0],
                    alignment: 'right',
                  }
                ],
            ]
          }
        },
        {
          fontSize: 10,
          text: 'Fecha doc.: ' + info['fecha'],
          margin: [0, 5, 0, 0],
        },
        {
          fontSize: 10,
          text: 'Beneficiario: ' + info['beneficiario'],
          margin: [0, 5, 0, 0],
        },
        {
          fontSize: 10,
          text: 'Institución: ' + info['institucion'],
          margin: [0, 5, 0, 0],
        },
        {
          fontSize: 10,
          text: 'Asunto: ' + info['asunto'],
          alignment: 'justify',
          margin: [0, 5, 0, 4],
        },
        {
          fontSize: 8,
          text: 'Gobierno Autónomo Municipal de Cochabamba.',
          alignment: 'center',
          margin: [0, 5, 0, 10],
        },
      ]
    }

    this.pdfObj = pdfMake.createPdf(pdfDefinition);

    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Guardamos el PFF en el dispositivo
        this.file.writeFile(this.config.getDirectorio(), 'pdf-'+info['nro']+'.pdf', blob, { replace: true }).then((fileEntry) => {
          this.msjSrv.mostrarAlerta("Descarga exitosa","La hoja de rutas se descargó en la carpeta de descargas. Nombre: "+ 'pdf-'+info['nro']+'.pdf');
          this.fileOpener.open(this.config.getDirectorio() + 'pdf-'+info['nro']+'.pdf', 'application/pdf');
        })
      });
    } else {
      // Descargamos modo escritorio
      this.pdfObj.download(`pdf-${+info['nro']}.pdf`);
    }
  }
  adjuntos(info) {
    var path = info[0]['ruta_doc'];
    this.showPdf(path);
  }
  adjuntos2(info) {    
    if(info.length === 1) {
      if (this.plt.is('cordova')) {
        const fileTransfer: FileTransferObject = this.transfer.create();
        const pathFile = this.config.getDirectorio()+ info[0]['nombre_doc'];
        fileTransfer.download(info[0]['ruta_doc'], this.file.dataDirectory + info[0]['nombre_doc']).then((entry) => {
          alert(entry.toURL());
          this.fileOpener.open(entry.toURL(), 'application/pdf');
        }, (error) => {
        });
      } else {
        window.open(info[0]['ruta_doc']);
      }
    }

  }

  // mas archivos
  showFiles(info) {
    var lstBotones = [];
    for(let d of info){
      const informacion = { text: d['nombre_doc'], handler: () => {this.showPdf(d['ruta_doc']); } };
      lstBotones.push(informacion);
    }
    const btnCerrar = { text: 'Cerrar',  handler: () => { }};
    lstBotones.push(btnCerrar);

    this.alertController.create({
      header: 'Lista de Archivos',
      subHeader: 'Presione sobre la lista de botones para ver el archivo',
      buttons: lstBotones
    }).then(res => {
      res.present();
    });
  }
  download(url) {
  }
  private async seguimiento(info){
    const modal= await this.modalCtrl.create({
      component: SeguimientoRutaPage,
      componentProps: {
        sch: info
      }
    });
    return await modal.present();
  }

  private getStoragePath() {
    const file = this.file;
    return this.file.resolveDirectoryUrl(this.file.dataDirectory)
    .then( (directoryEntry) => {
      return file.getDirectory(
          directoryEntry, 
          'our_root_folder', 				
            {
                create: true,
                exclusive: false
            })
        .then( () => {
            return directoryEntry.nativeURL + 'our_root_folder/';
        });
    });
  }
  private async showPdf(pathurl){
    const modal= await this.modalCtrl.create({
      component: ShowPdfPage,
      componentProps: {
        url: pathurl
      }
    });
    return await modal.present();
  }
  goBack() {
    this.router.navigate(['/servicios']);
    this.lstHojaRutas = [];
    this.form.reset();
    this.form.get('tipo').setValue('N');
    this.form.get('gestion').setValue(this.activeYear);
  }
}