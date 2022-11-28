import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface SelectItem {
  valor: number;
  name: string;
}
@Component({
  selector: 'app-recursos-humanos',
  templateUrl: './recursos-humanos.page.html',
  styleUrls: ['./recursos-humanos.page.scss'],
})
export class RecursosHumanosPage implements OnInit {
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  verVacantes() {
    this.router.navigateByUrl('/recursos-humanos/vacantes');
  }
  verNuevoPersonal() {
    this.router.navigateByUrl('/recursos-humanos/nuevo-personal');
  }

  goBack() {
    this.router.navigate(['/servicios']);
  }
}
