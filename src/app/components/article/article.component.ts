import { Component, Input, OnInit, Optional } from '@angular/core';
import { ArticleInfo } from './article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() articleInfo: ArticleInfo = {
    title: "hello world, I am little moust ache. Welcome to this website",
    publishDate: "2021-08-10 19:51:00",
    liked: 10,
    views: 10
  };
  constructor() { 
  }

  ngOnInit(): void {
  }

  get date(){
    const publishDate = new Date(this.articleInfo.publishDate);
    const now = new Date();
    const timediff = now.getTime() - publishDate.getTime();
    const yeardiff = now.getFullYear() - publishDate.getFullYear();
    const monthdiff = yeardiff * 12 + (now.getMonth() - publishDate.getMonth());
    if (timediff/1000 <= 60){
      const minutes = Math.floor(timediff/1000);
      return `${minutes}sec ago`
    }
    else if (timediff/1000/60/60 <= 1){
      const minutes = Math.floor(timediff/1000/60);
      return `${minutes}min ago`
    }
    else if(timediff/1000/60/60 <= 24){
      const hours = Math.floor(timediff/1000/60/60);
      return `${hours}hr ago`
    }
    else if (monthdiff == 0){
      const days = Math.floor(timediff/1000/60/60/24);
      return `${days}day ago`
    }
    else if (monthdiff <= 12){
      return `${monthdiff}mo ago`;
    }
    else{
      return `${yeardiff}yr ago`;
    }

  }

  get viewCount(){
    if(this.articleInfo.views >= 1000){
      return '999+'
    }
    return this.articleInfo.views.toString()
  }

  get likeCount(){
    if(this.articleInfo.liked >= 1000){
      return '999+'
    }
    return this.articleInfo.liked.toString()
  }

  get title(){
    if(this.articleInfo.title.length >= 60){
      return this.articleInfo.title.slice(0,57) + '...'
    }
    return this.articleInfo.title
  }
  get tip(){
    return {
      value: this.articleInfo.title
    }
  }

}
