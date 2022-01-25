import { Component, Input, OnInit, Optional } from '@angular/core';
import { ArticleInfo } from './article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() articleInfo: ArticleInfo = {
    id: 1,
    author: "zhangsan",
    title: "hello world, I am little moustache. Welcome to this website",
    createtime: 1643086376378,
    content: "whatever"
  };
  constructor() { 
  }

  ngOnInit(): void {
  }

  get date(){
    return new Date(this.articleInfo.createtime).toLocaleString()
  }

  get author(){
    return this.articleInfo.author;
  }

  // get viewCount(){
  //   if(this.articleInfo.views >= 1000){
  //     return '999+'
  //   }
  //   return this.articleInfo.views.toString()
  // }

  // get likeCount(){
  //   if(this.articleInfo.liked >= 1000){
  //     return '999+'
  //   }
  //   return this.articleInfo.liked.toString()
  // }

  get title(){
    if(this.articleInfo.title.length >= 30){
      return this.articleInfo.title.slice(0,25) + '...'
    }
    return this.articleInfo.title
  }

  get tip(){
    return {
      value: this.articleInfo.title
    }
  }

}
