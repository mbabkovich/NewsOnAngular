import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewsArticleComponent } from './view-news-article.component';

describe('ViewNewsArticleComponent', () => {
  let component: ViewNewsArticleComponent;
  let fixture: ComponentFixture<ViewNewsArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNewsArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
