import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjecucionPresupuestariaService {

  constructor(
    private httpClient: HttpClient,
  ) { }
  public getEjecucionPresopuestaria() {
    return this.httpClient.get(environment.apiEjePresupuestaria+ '/obtain-ejecucion');
  }
}