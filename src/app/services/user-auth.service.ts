import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlBackend } from './urlBackend';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  public url = urlBackend.url;

  constructor(
    private _http: HttpClient
  ) { }

  saveUser(params):Observable<any>{
    params=JSON.stringify(params);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'save-user',params,{headers:headers});
  }

  login(params):Observable<any>{
    params=JSON.stringify(params);
    let headers= new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login',params,{headers:headers});
  }
}
