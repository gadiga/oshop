import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTestSiblingComponent } from './content-test-sibling.component';

describe('ContentTestSiblingComponent', () => {
  let component: ContentTestSiblingComponent;
  let fixture: ComponentFixture<ContentTestSiblingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTestSiblingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTestSiblingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
