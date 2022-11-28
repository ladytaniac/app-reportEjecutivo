import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss'],
})
export class TituloComponent implements OnInit {
  txtTitulo:string;
  txtIcono:string;
  @Input() text: string;
  @Input() icon: string;
  constructor() { }

  ngOnInit() {
    this.txtTitulo= this.text;
    this.txtIcono= this.icon;
  }
}
