import { Component, OnInit, AfterContentChecked, AfterContentInit, ContentChildren, QueryList, HostBinding, Directive, Input, ElementRef, Renderer, HostListener, ContentChild } from '@angular/core';
import { ContentTestComponent } from '../content-test/content-test.component';

@Directive({
  selector: 'pane'
})
export class Pane {
  // TODO(issue/24571): remove '!'.
  @Input() id: string;
  

  @HostListener('mouseover') onMouseOver() { 
    let part = this.el.nativeElement.querySelector('.card-text') 
    this.renderer.setElementStyle(part, 'border', 'red'); 
  }

  constructor(private el: ElementRef, private renderer: Renderer){
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'brown');
  }
}

@Component({
  selector: 'app-container-test',
  templateUrl: './container-test.component.html',
  styleUrls: ['./container-test.component.css']
})
export class ContainerTestComponent implements OnInit, AfterContentChecked, AfterContentInit {

  @ContentChildren(ContentTestComponent) containerChildren = new QueryList<any>();
  @ContentChild('containerChildren2') child2: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked () {  
    console.log('container content checked');
    this.containerChildren.forEach(item=>console.log('contentchecked', item));
  }

  ngAfterContentInit () {
    console.log('container content init');
    this.containerChildren.forEach(item=>console.log('contentinit', item));
    console.log("child2.............", this.child2.nativeElement ? this.child2.nativeElement.innerHTML: 'nothing here');
  }

}
