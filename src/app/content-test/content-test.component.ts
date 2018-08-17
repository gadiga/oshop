import { Component, OnInit } from '@angular/core';
import { ContentTestService } from '../shared/services/content-test.service';

@Component({
  selector: 'app-content-test',
  templateUrl: './content-test.component.html',
  styleUrls: ['./content-test.component.css']
})
export class ContentTestComponent implements OnInit {

  contentValue: number;

  constructor(private content: ContentTestService) { }

  ngOnInit() {

    this.content.tester.subscribe(val=>this.contentValue = val)
  }

  sendBS () {
    this.content.sendStuff();
  }

}
