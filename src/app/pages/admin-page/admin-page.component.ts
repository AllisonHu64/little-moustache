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
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  public search="";
  public blogListDataSource: MatTableDataSource<ArticleInfo> = new MatTableDataSource<ArticleInfo>([]);;
  private _subscriptions: Subscription[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private _blogService: BlogService, private _route: ActivatedRoute, private _userService: UserService, private _router: Router) { 
    this._subscriptions.push(
      this._route.queryParams
        .pipe(first()).subscribe((params:any) => {

          this._blogService.getBlogs(params.author??"", params.keyword??"", true).subscribe((resp: any)=>{
          if (resp?.errno === 0){
            this.blogListDataSource = new MatTableDataSource<ArticleInfo>(resp.data);
          } else {
            window.alert("failed to get blog list.")
          }
      })
    })
    );
  }

  ngAfterViewInit() {
    this.blogListDataSource.paginator = this.paginator;
  }

  ngOnDestory():void{
    for(let subscription of this._subscriptions){
      subscription.unsubscribe()
    }
  }

  get displayedColumns(){
    return ['id', 'title', 'author', 'createtime', 'operations'];
  }

  formatCreatetime(createtime:number):string {
    return new Date(createtime).toLocaleString()
  }

  queryParams(id:number):object{
    return {id:id};
  }

  onEditClick(id:number){
    this._userService.loginCheck().pipe(first()).subscribe((resp:any)=>{
      if (resp.errno === 0){
        this._router.navigate(["/edit-blog"],{queryParams:{id:id}})
        console.log(`/edit-blog`, {queryParams:{id:id}})
      } else {
        window.alert("Session has expired. Please login.")
      }
    })
  }

  onDeleteClick(id:number){
    this._userService.loginCheck().pipe(first()).subscribe((resp:any)=>{
      if (resp.errno === 0){
        this._blogService.deleteBlog(id).pipe(first()).subscribe((resp:any)=>{
          if (resp.errno === 0){
            window.alert("Successfully deleted blog");
            window.location.reload();
          } else {
            window.alert("Failed to deleted blog");
          }
        });
      } else {
        window.alert("Session has expired. Please login.")
      }
    })

  }

  onSearchClick(){
    this._blogService.getBlogs( "", this.search, true).pipe(first()).subscribe((resp: any)=>{
      if (resp?.errno === 0){
        this.blogListDataSource = new MatTableDataSource<ArticleInfo>(resp.data);
      } else {
        window.alert("failed to get blog list.")
      }
    })
  }

}
