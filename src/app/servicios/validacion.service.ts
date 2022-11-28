import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  constructor() { }

  validaCelular(celular: AbstractControl): { [key: string]: boolean } {
    let valorCelular = celular.value;
    if (valorCelular && typeof valorCelular === "string") {
      let match = valorCelular.match(/^[7|6]{1}([\d]{7}[-]*)/);
      if (!match) {
        return { validaCelular: true };
      }

    }
  }
}
