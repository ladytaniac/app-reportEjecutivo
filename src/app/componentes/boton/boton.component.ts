import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.scss'],
})
export class BotonComponent implements OnInit {
  @Input() texto: string;
  @Input() cancelar: string;
  private txtNombre: string;
  private rolBtn: string;
  constructor() { 
    // this.rolBtn= false;
  }

  ngOnInit() {
    this.txtNombre= this.texto;
    this.rolBtn= this.cancelar;
    console.log(this.rolBtn);
  }

}
