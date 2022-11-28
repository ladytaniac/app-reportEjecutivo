import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursosHumanosService {
  private httpOptions: object;
  constructor(
    private httpClient: HttpClient
  ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
  }
  public getVacantes() {
    return this.httpClient.get(environment.apiRRHH, this.httpOptions);
  }
}
