import { Component, OnInit } from '@angular/core';
import { ProjectShortInfo } from '../../components/project/project.model';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {
  public myProjectInfos:ProjectShortInfo[] = [
    {
      backgroupPic: "assets/pic/celebration.png",
      iconPic:"assets/pic/first-place.png",
      shortDescription: "hello it is me, i am from far far away. hahahahaha test",
      backgroundColor: "yellowgreen",
      title : "Wechat MiniProgram Easy Mail jaja ha ah ahaha aha ",
    },
    {
      backgroupPic: "assets/pic/communication.png",
      iconPic:"assets/pic/second-place.png",
      shortDescription: "hello it is me, i am from far far away. hahahahaha test",
      backgroundColor: "yellow",
      title : "Wechat MiniProgram Easy Mail jaja ha ah ahaha aha ",
    },
    {
      backgroupPic: "assets/pic/working.png",
      iconPic:"assets/pic/third-place.png",
      shortDescription: "hello it is me, i am from far far away. hahahahaha test",
      backgroundColor: "orange",
      title : "Wechat MiniProgram Easy Mail jaja ha ah ahaha aha ",
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }
  

}
