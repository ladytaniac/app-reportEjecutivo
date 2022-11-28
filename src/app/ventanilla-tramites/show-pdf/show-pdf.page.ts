import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-pdf',
  templateUrl: './show-pdf.page.html',
  styleUrls: ['./show-pdf.page.scss'],
})
export class ShowPdfPage implements OnInit {
  pathGoogle = 'https://docs.google.com/gview?url=';
  pathEmbedded = '&embedded=true';
  pathFile;
  constructor(
    private router: Router,
    private navParams: NavParams,
    private modalController: ModalController,
    private sanitized: DomSanitizer,
    private httpClient: HttpClient,
    public  sanitizer:DomSanitizer
  ) { 
    var actualpath = this.navParams.get('url');
    var nuevopath = this.pathGoogle + actualpath + this.pathEmbedded;
    this.pathFile = nuevopath;
  }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
    // this.router.navigate(['/ventanilla-tramites']);
  }
}