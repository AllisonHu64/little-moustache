import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Subscription } from "rxjs"
import {trigger, state, style, animate, transition, animation} from '@angular/animations';
import { ArticleInfo } from 'src/app/components/article/article.model';
import { BlogService } from '../../service/blog/blog.service';

// 可以修改的地方，swiper 拖拽等问题

function createSwiperStateStyle(width:number){
  const marginLeftValue = `-${width * 80}vw`;
  return style({
    marginLeft: marginLeftValue
  })
}

function createSwiperStateAnimation(swiperNum:number){
  let animations = [];
  if (swiperNum > 1){
    animations.push(
      state('-1',createSwiperStateStyle(0))
    );
    for(let i = 0; i < swiperNum; i++){
      animations.push(state(i.toString(),createSwiperStateStyle(i+1)))
      animations.push(
        transition(`${i-1} <=> ${i}`,[
          animate('0.5s')
        ])
      )
    }
    animations.push(
      ...[state(`${swiperNum}`, createSwiperStateStyle(swiperNum+1)),
          transition(`${swiperNum-1} => 0`, [
            createSwiperStateStyle(0),
            animate('0.5s',createSwiperStateStyle(1))
          ]),
          transition(`0 => ${swiperNum-1}`, [
            animate('0.5s',createSwiperStateStyle(0)),
            createSwiperStateStyle(swiperNum)
          ]),
        ]
    )

  }
  return animations
}


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations:[
    trigger('swiperMove', createSwiperStateAnimation(8))
  ]
})
export class HomePageComponent implements OnInit {
  public signal = "0";
  public isSearchbarFocus = false;
  public swiperPicArray = [
    "assets/pic/focus8.png",
    "assets/pic/focus1.png",
    "assets/pic/focus2.png",
    "assets/pic/focus3.png",
    "assets/pic/focus4.png",
    "assets/pic/focus5.png",
    "assets/pic/focus6.png",
    "assets/pic/focus7.png",
    "assets/pic/focus8.png",
    "assets/pic/focus1.png",
  ]

  public currentPicIndex = 0;
  @ViewChild('Pictures') picturesRef:ElementRef | undefined;
  private _swipeInerval:any;
  private _recentBlogs: ArticleInfo[] = [];
  private _subscriptions: Subscription[] = [];

  constructor(private _render:Renderer2, private _blogService: BlogService) { 
    this._subscriptions.push(_blogService.getBlogs().subscribe((resp: any)=>{
      if (resp?.errno === 0){
        this._recentBlogs = resp.data;
      } else {
        this._recentBlogs = [];
      }
    }));
  }
  ngOnInit(): void {
  }

  ngAfterViewInit():void{
    this.startAutomaticSwipe()
  }

  ngOnDestory():void{
    this._swipeInerval.clear()
    for(let subscription of this._subscriptions){
      subscription.unsubscribe()
    }
  }

  swipe(number:-1|1){
    const newSignal = (Number(this.signal) + number).toString();
    if (newSignal === "8"){
      this.signal = "0";
    }
    else if (newSignal === "-1"){
      this.signal = "7"
    }
    else{
      this.signal = newSignal;
    }
  }

  stopAutomaticSwipe(){
    if (this._swipeInerval){
      clearInterval(this._swipeInerval);
    }
  }

  async startAutomaticSwipe(){
    clearInterval(this._swipeInerval);
    this._swipeInerval = setInterval(
      ()=>{
        if ( Number(this.signal) === 7){
          this.signal = '0';
        }
        else{
          this.signal = (Number(this.signal) + 1).toString();
        }
      },2000)
  }

  
  setIsSearchbarFocus(value:boolean){
    this.isSearchbarFocus = value;
  }

  get recentBlogs(){

    return this._recentBlogs;
  }
}
