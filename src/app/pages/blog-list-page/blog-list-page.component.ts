import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs"
import { ArticleInfo } from 'src/app/components/article/article.model';
import { BlogService } from '../../service/blog/blog.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';


// TODO issue with pagination
@Component({
  selector: 'app-blog-list-page',
  templateUrl: './blog-list-page.component.html',
  styleUrls: ['./blog-list-page.component.scss']
})
export class BlogListPageComponent{
  public blogListDataSource: MatTableDataSource<ArticleInfo> = new MatTableDataSource<ArticleInfo>([]);;
  private _subscriptions: Subscription[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private _blogService: BlogService, private _route: ActivatedRoute) { 
    this._subscriptions.push(
      this._route.queryParams
        .pipe(first()).subscribe((params:any) => {

          this._blogService.getBlogs(params.author??"", params.keyword??"").subscribe((resp: any)=>{
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
    return ['id', 'title', 'author', 'createtime'];
  }

  formatCreatetime(createtime:number):string {
    return new Date(createtime).toLocaleString()
  }

  queryParams(id:number):object{
    return {id:id};
  }
}
