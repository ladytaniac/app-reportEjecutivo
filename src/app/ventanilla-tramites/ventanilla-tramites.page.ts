import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtlasService } from '../servicios/atlas.service';
import { HttpClient } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { ConfigDatosApp } from 'src/configuracion/config';
import { MensajesService } from '../proveedores/mensajes.service';

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
  ) { }

  ngOnInit() {
    this.formulario();
    this.loadLocalAssetToBase64();
    const now = new Date();
    const datestring = now.toISOString();
    var fecha = datestring.split('T')[0];

    this.fechaConsulta = fecha.split('-')[2] + '-' + fecha.split('-')[1] + '-' + fecha.split('-')[0];
  }
  formulario() {
    this.form = this.fbuilder.group({
      gestion: ["", [Validators.required]],
      tipo: ["N", [Validators.required]],
      dato: ["", [Validators.required]],
    });
  }

  buscar() {
    if(this.form.valid) {
      this.srvAtlas.getListaTramites(this.form.value).subscribe((data) => {
        if(data['status'] == true) {
          this.showInfo = true;
          this.lstHojaRutas = data['response'];
          this.form.reset();
          this.form.get('tipo').setValue('N');
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
          color: '#ae1857',
        },
        {
          fontSize: 10,
          text: 'Fecha: '+ this.fechaConsulta,
          margin: [0, 3, 0, 4],
          alignment: 'right',
          bold: true,
          color: '#482778',
        },
        {
          table: {
            widths: ['*', 70],
            body: [
                [
                  {
                    fontSize: 10,
                    border: [false, false, false, false],
                    // fillColor: '#fff',
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

    // this.pdfObj = pdfMake.createPdf(pdfDefinition).download(`pdf-${+info['nro']}.pdf`);

    this.pdfObj = pdfMake.createPdf(pdfDefinition);

    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.config.getDirectorio(), 'pdf-'+info['nro']+'.pdf', blob, { replace: true }).then((fileEntry) => {
          // Open the PDf with the correct OS tools
          this.msjSrv.mostrarAlerta("Descarga exitosa","La hoja de rutas se descargó en la carpeta de descargas. Nombre: "+ 'pdf-'+info['nro']+'.pdf');
          this.fileOpener.open(this.config.getDirectorio() + 'pdf-'+info['nro']+'.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download(`pdf-${+info['nro']}.pdf`);
    }
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
  goBack() {
    this.router.navigate(['/servicios']);
    this.lstHojaRutas = [];
    this.form.reset();
    this.form.get('tipo').setValue('N');
  }
}
