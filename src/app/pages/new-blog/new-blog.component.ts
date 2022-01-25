import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs"
import { ArticleInfo } from 'src/app/components/article/article.model';
import { BlogService } from '../../service/blog/blog.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss']
})
export class NewBlogComponent implements OnInit {
  public title = "";
  public content = "";

  constructor( private _blogService: BlogService, private _route: ActivatedRoute, private _userService: UserService, private _router: Router) 
  { }

  ngOnInit(): void {
  }

  
  onNewBlogClick(){
    if (!this.title || !this.content){
      window.alert("title or content is empty");
      return;
    }
    this._userService.loginCheck().pipe(first()).subscribe((resp:any)=>{
      if (resp.errno === 0){
        this._blogService.newBlog(this.title, this.content).pipe(first()).subscribe((resp:any)=>{
          if (resp.errno === 0){
            window.alert("Successfully created new blog");
            this._router.navigate(["/admin"])
          } else {
            window.alert("Failed to create new blog");
          }
        });
      } else {
        window.alert("Session has expired. Please login.")
      }
    })

  }
}
