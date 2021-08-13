import { Component, OnInit } from '@angular/core';
import { TipModel } from '../../directives/tip/tip.model';

@Component({
  selector: 'app-hover-tip',
  templateUrl: './hover-tip.component.html',
  styleUrls: ['./hover-tip.component.scss']
})
export class HoverTipComponent implements OnInit {
  public tipModel: TipModel | undefined = {
    value:"hello, it is me. . . . . . . . .  .hello, it is me.hello, it is me.hello, it is me.hello, it is me.hello, it is me."
  };
  constructor() { }

  ngOnInit(): void {
  }

  get tip(){
    if(this.tipModel && this.tipModel.value.length >= 120){
      return this.tipModel.value.slice(0,117) + '...'
    }
    return this.tipModel? this.tipModel.value:'';
  }
}
