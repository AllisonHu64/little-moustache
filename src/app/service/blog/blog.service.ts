import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _http: HttpClient) {

  }

  getBlogs(author:string = "", keyword:string = "",isAdmin: boolean = false): Observable<{}> {
    let url = "/api/blog/list?1=1&";
    if (isAdmin){
      url += "&isadmin=1";
    }
    if (author!=="''") {
      url += `&author=${author}`;
    }
    if (keyword!=="'%%'") {
        url += `&keyword=${keyword}`;
    }
    return this._http.get<{}>(url)
  }

  getBlogDetail(id: number): Observable<{}> {
    let url = `/api/blog/detail?id=${id}`;
    return this._http.get<{}>(url)
  }
  
}
