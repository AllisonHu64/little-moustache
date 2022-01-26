import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  login(username:string, password:string): Observable<{}> {
    let url = "/api/user/login";
    
    return this._http.post<{}>(url, {username : username, password : password })
  }

  loginCheck() : Observable<{}> {
    let url = "/api/user/loginCheck";
    return this._http.post<{}>(url, {})
  }

  logout(): Observable<{}> {
    let url = "/api/user/logout";
    return this._http.post<{}>(url, {})
  }
}
