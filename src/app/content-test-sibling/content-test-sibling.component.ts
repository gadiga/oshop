import { Component, OnInit } from '@angular/core';
import { ContentTestService } from '../content-test.service';

@Component({
  selector: 'app-content-test-sibling',
  templateUrl: './content-test-sibling.component.html',
  styleUrls: ['./content-test-sibling.component.css']
})
export class ContentTestSiblingComponent implements OnInit {

  contentValue: number;

  constructor(private content: ContentTestService) { }

  ngOnInit() {

    this.content.tester.subscribe(val=>this.contentValue = val);
  }

}
