import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationRequestModel } from './Models/authentication-request.model';

const baseUrl = 'http://localhost:5222/';

@Injectable({
  providedIn: 'root'
})
export class ClientAppService {

  constructor(private _http: HttpClient) { }

  login(body: AuthenticationRequestModel): Observable<any> {
    return this._http.post(`${baseUrl}api/Authentication/Authenticate`, body);
  }
}
