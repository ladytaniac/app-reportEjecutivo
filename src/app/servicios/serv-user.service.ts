import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ServUserService {
  private readonly _SESION:string= 'sesion';
  private httpOptions: object;
  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { 
    this.storage.create();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
  }
  public logueoUser(data:object):Observable<any>{
    return this.http.post(environment.loginURL,data);
  }
  public logoutUser():Promise<any>{
    return this.storage.remove(this._SESION);
  }
}
