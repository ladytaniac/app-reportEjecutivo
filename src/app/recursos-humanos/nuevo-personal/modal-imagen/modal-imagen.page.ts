import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { environment } from '@env/environment';


@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.page.html',
  styleUrls: ['./modal-imagen.page.scss'],
})
export class ModalImagenPage implements OnInit {
  numDocumento;
  avalFuncioantio;
  URL = environment.apiRepEjecutivo;
  showImg: boolean = false;
  imagen;
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private httpClient: HttpClient,
  ) {
    this.numDocumento = this.navParams.get('dni');
  }

  ngOnInit() {
    this.avalPolitico();
    this.imagenFuncionario();
  }

  avalPolitico() {
    var API_URL = this.URL + 'utils/request/busq_dni';
    let formData: any = new FormData();
    formData.append('dni', this.numDocumento);
    this.httpClient.post(API_URL, formData).subscribe((data) => {
      if(data['status'] == false) {
        this.avalFuncioantio = data['response'].message;
        // console.log('estado false=',this.avalFuncioantio );
      } else {
        this.avalFuncioantio = data['response'].message;
        // console.log('estado true=',this.avalFuncioantio );
      }
    });
  }
  imagenFuncionario() {
    var API_URL = environment.apiFotoEmpleado;
    let formData: any = new FormData();
    formData.append('dato', this.numDocumento);
    this.httpClient.post(API_URL, formData).subscribe((data) => {
      if(data['status'] == true) {
        this.showImg = true;
        this.imagen = 'data:image/jpeg;base64,' + data['data'][0].foto;
      } else {
        this.showImg = false;
      }
    });
  }
  async closeModal() {
    await this.modalController.dismiss();
  }
}
