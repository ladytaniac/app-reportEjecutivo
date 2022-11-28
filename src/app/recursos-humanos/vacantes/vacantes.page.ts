import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecursosHumanosService } from '../../servicios/recursos-humanos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface SelectItem {
  valor: number;
  name: string;
}
@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.page.html',
  styleUrls: ['./vacantes.page.scss'],
})
export class VacantesPage implements OnInit {
  lstvacantes= [];
  filterData = [];
  seleccionado = 2;
  lstItem = [
    // { valor: 1, name: 'Item' },
    { valor: 2, name: 'Oficina' },
  ];
  form: FormGroup;
  constructor(
    private router: Router,
    private srvRRHH: RecursosHumanosService,
    private fbuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.misVacantes();
    this.formulario();
  }
  ionViewDidEnter() {
    this.setFilteredLocations();

  }

  formulario() {
    this.form = this.fbuilder.group({
      tipo_busq: [this.seleccionado, [Validators.required]],
      busqueda: ["", [Validators.required]],
    });
  }

  misVacantes() {
    this.srvRRHH.getVacantes().subscribe(data => {
      if(data['status'] == true) {
        this.lstvacantes = data['response'].vacantes;
      }
    });
  }
  compareTipoDocumento(o1: SelectItem, o2: SelectItem) {
    return o1 && o2 ? o1.valor === o2.valor : o1 === o2;
  }

  setFilteredLocations() {
    // busqueda por oficina
    if(this.form.get('tipo_busq').value == 2) {
      if(this.form.get('busqueda').value != ''){
        this.filterData = this.lstvacantes.filter(current => {
          return (current['oficina'].toLowerCase().indexOf(this.form.get('busqueda').value.toLowerCase()) >-1)
        });
      } else {
        this.filterData = this.lstvacantes;
      }
    }
    // busqueda por item
    if(this.form.get('tipo_busq').value == 1) {
      if(this.form.get('busqueda').value != ''){ 
        this.filterData = this.lstvacantes.filter(currenti => {
          return (currenti['item'].toString().indexOf(this.form.get('busqueda').value) >-1)
        });
      } else {
        this.filterData = this.lstvacantes;
      }
    }
  }
  changeTipoBusq() {
    this.form.get('busqueda').setValue('');
    if(this.form.get('busqueda').value == '') {
      this.filterData = this.lstvacantes;
    }
  }

  buscar() {
    console.log(this.form.value);
  }

  goBack() {
    this.router.navigate(['/recursos-humanos']);
  }

  get tipo_busq() { return this.form.get('tipo_busq'); }
  get busqueda() { return this.form.get('busqueda'); }

}
