import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtlasService {
  private httpOptions: object;

  constructor(
    private http: HttpClient,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
  }

  public getListaTramites(data:object):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post(environment.apiAtlas+'/listar-tramites',data, httpOption);
  }
  public getSeguimientoHojaRuta(data:object):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post(environment.apiAtlas+'/seguimiento-tramite-gestion',data, httpOption);
  }

  public getArchivosTramites(data:object):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post(environment.apiAtlas+'/archivos-tramites',data, httpOption);
  }
}
