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

  getBlogDetail(id: number, isAdmin:boolean = false): Observable<{}> {
    let url = `/api/blog/detail?id=${id}`;
    if (isAdmin){
      url += "&isadmin=1";
    }
    return this._http.get<{}>(url)
  }

  deleteBlog(id: number): Observable<{}> {
    let url = `/api/blog/delete?id=${id}`;
    return this._http.post<{}>(url,{});
  }

  newBlog(title:string, content:string): Observable<{}> {
    let url = `/api/blog/new`;
    return this._http.post<{}>(url, {title:title, content:content})
  }
  
  updateBlog(id:number, title:string, content:string): Observable<{}> {
    let url = `/api/blog/update?id=${id}`;
    return this._http.post<{}>(url, {title:title, content:content})
  }
}
