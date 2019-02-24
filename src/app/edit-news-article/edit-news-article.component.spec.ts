import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewsArticleComponent } from './edit-news-article.component';

describe('EditNewsArticleComponent', () => {
  let component: EditNewsArticleComponent;
  let fixture: ComponentFixture<EditNewsArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNewsArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
