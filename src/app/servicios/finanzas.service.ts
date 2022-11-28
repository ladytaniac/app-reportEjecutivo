import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {
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

  public getFinanzas() {
    return this.httpClient.get(environment.apiFinanzas, this.httpOptions);
  }
}
