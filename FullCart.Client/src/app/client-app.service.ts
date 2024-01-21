import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthenticationRequestModel } from './Models/authentication-request.model';
import { UserRoleEnum } from './Enum/user-role.enum';

const baseUrl = 'http://localhost:5222/';

@Injectable({
  providedIn: 'root'
})
export class ClientAppService {

  private _loggedInUserRole: Subject<string> = new Subject<string>();

  constructor(private _http: HttpClient) { }

  getLoggedInUserRole(): Observable<string> {
    return this._loggedInUserRole.asObservable();
  }

  setLoggedInUserRole(newLang: any): void {
    this._loggedInUserRole.next(newLang);
  }

  login(body: AuthenticationRequestModel): Observable<any> {
    return this._http.post(`${baseUrl}api/Authentication/Authenticate`, body);
  }
}
