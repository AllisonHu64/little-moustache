import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) {

  }

  getBlogs(isAdmin: boolean = false): Observable<{}> {
    let url = "/api/blog/list";
    if (isAdmin){
      url += "?isadmin=1";
    }
    return this.http.get<{}>(url)
  }

  getBlogDetail(id: number): Observable<{}> {
    let url = `/api/blog/detail?id=${id}`;
    return this.http.get<{}>(url)
  }
  
}
