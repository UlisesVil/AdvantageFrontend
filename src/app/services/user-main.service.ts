import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlBackend } from './urlBackend';

@Injectable({
  providedIn: 'root'
})
export class UserMainService {
  public url = urlBackend.url;

  constructor(
    private _http: HttpClient
  ) { }

  saveUserData(params):Observable<any>{
    params=JSON.stringify(params);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'save-userdata',params,{headers:headers});
  }

  uploadimg(formData):Observable<any>{
    return this._http.post(this.url+'uploadimg',formData);
  }

  uploadimgBase64(imgBase64):Observable<any>{
    return this._http.post(this.url+'uploadimgBase64',imgBase64);
  }

  getUser(userId):Observable<any>{
    let headers= new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getuser/'+userId,{headers:headers});
  }

  updateImageUrl(imageData):Observable<any>{
    return this._http.post(this.url+'updateImageUrl',imageData);
  }
}

