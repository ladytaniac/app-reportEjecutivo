import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { environment } from '@env/environment';
import { RecursosHumanosService } from 'src/app/servicios/recursos-humanos.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
  colorArray: any;
  URL = environment.apiRepEjecutivo;
  form: FormGroup;
  showInfo: boolean = false;
  funcionarios = [];
  mensaje = '';
  constructor(
    private router: Router,
    private fbuilder: FormBuilder,
    private httpClient: HttpClient,
    private modalCtrl: ModalController,
    private srvHhrr: RecursosHumanosService
  ) { }

  ngOnInit() {
    this.formulario();
  }

  ionViewDidEnter() {
    // this.setFilteredLocations();
  }

  formulario() {
    this.form = this.fbuilder.group({
      nombre: ['', [Validators.required]],
      paterno: ['', [Validators.required]],
    });
  }
  
  filtrar() {
    if(this.form.valid) {
      this.srvHhrr.getFuncionarios(this.form.value).subscribe(data => {
        if(data.length > 0) {
          this.funcionarios = data;
          this.showInfo = true;
          this.mensaje = '';
        } else {
          this.mensaje = 'Lo siento, al funcionario que busca no se encuentra en los registros.'
          this.showInfo = false;
        }
      });
    }
  }
  goBack() {
    this.router.navigate(['/recursos-humanos']);
    this.form.reset();
  }
  get nombre() { return this.form.get('nombre'); }
  get paterno() { return this.form.get('paterno'); }

}