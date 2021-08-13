import { Component, Input, OnInit } from '@angular/core';
import { ProjectShortInfo } from './project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() projectShortInfo:ProjectShortInfo = {
    backgroupPic: "assets/pic/celebration.png",
    iconPic:"assets/pic/first-place.png",
    shortDescription: "hello it is me, i am from far far away. hahahahaha test",
    backgroundColor: "yellowgreen",
    title : "Wechat MiniProgram Easy Mail jaja ha ah ahaha aha ",
  }
  public toggleShortDes = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    console.log('AA')
    this.toggleShortDes = !this.toggleShortDes;
  }


}
