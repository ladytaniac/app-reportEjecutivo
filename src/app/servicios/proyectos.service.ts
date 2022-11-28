import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private httpOptions: object;
  constructor(
    private httpClient: HttpClient,
  ) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
  }
  public getObtainSelect() {
    return this.httpClient.get(environment.apiProyectos+ '/obtain-selects');
  }
  public obtainGraphics(data:object):Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    return this.httpClient.post(environment.apiProyectos+ '/obtain-graphics', data, httpOption);
  }
}
