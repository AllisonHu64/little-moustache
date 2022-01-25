import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { BlogService } from 'src/app/service/blog/blog.service';
import { ArticleInfo } from 'src/app/components/article/article.model';

@Component({
  selector: 'app-blog-detail-page',
  templateUrl: './blog-detail-page.component.html',
  styleUrls: ['./blog-detail-page.component.scss']
})
export class BlogDetailPageComponent implements OnInit {

  private _blogDetail: ArticleInfo | null = null;
  private _blogDetailSubscription: Subscription | null = null;

  constructor(private _route: ActivatedRoute, private _router: Router, private _blogService: BlogService) { }

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
          
          this._blogDetailSubscription = this._blogService.getBlogDetail(params.id).subscribe(
            (resp: any)=>{
              if (resp.errno !== 0 || !resp.data){
                window.alert(`Failed to retrieve blog with id: ${params.id}. The blog could be deleted.`)
                // redirect to home
                this._router.navigate(["home"]);
              } else {
                this._blogDetail = resp.data;
                console.log(resp.data)
              }
            });
        }

      }
    );
  }

  ngOnDestory():void{
    if (this._blogDetailSubscription){
      this._blogDetailSubscription.unsubscribe();
    }
  }

  get author(){
    return this._blogDetail?.author;
  }

  get createTime(){
    return this._blogDetail? new Date(this._blogDetail.createtime).toLocaleString() : "";
  }

  get title(){
    return this._blogDetail?.title;
  }

  get content(){
    return this._blogDetail?.content;
  }
}
