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
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  public title = "";
  public content = "";
  private _blogDetail: ArticleInfo | null = null;
  private _blogDetailSubscription: Subscription | null = null;

  constructor( private _blogService: BlogService, private _route: ActivatedRoute, private _userService: UserService, private _router: Router) 
  { }

  ngOnInit(): void {
    this._route.queryParams
      .subscribe((params:any) => {
        if (!params.id){
          // redirect to home
          this._router.navigate(["home"]);
        } else {
          
          if (this._blogDetailSubscription){
            this._blogDetailSubscription.unsubscribe();
          }
          
          this._blogDetailSubscription = this._blogService.getBlogDetail(params.id, true).subscribe(
            (resp: any)=>{
              if (resp.errno !== 0 || !resp.data){
                window.alert(`Failed to retrieve blog with id: ${params.id}. The blog could be deleted.`)
                // redirect to home
                this._router.navigate(["home"]);
              } else {
                this._blogDetail = resp.data;
                this.title = this._blogDetail?.title ?? "";
                this.content = this._blogDetail?.content ?? "";
              }
            });
        }

      }
    );
  }

  
  onUpdateBlogClick(){
    if (!this.title || !this.content){
      window.alert("title or content is empty");
      return;
    }
    this._userService.loginCheck().pipe(first()).subscribe((resp:any)=>{
      if (resp.errno === 0){
        this._blogService.updateBlog(this._blogDetail?.id ?? -1, this.title, this.content).pipe(first()).subscribe((resp:any)=>{
          if (resp.errno === 0){
            window.alert("Successfully update new blog");
            this._router.navigate(["/admin"])
          } else {
            window.alert("Failed to update new blog");
          }
        });
      } else {
        window.alert("Session has expired. Please login.")
      }
    })

  }

}
