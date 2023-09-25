import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsArticlesComponent } from './news-articles.component';

describe('NewsArticlesComponent', () => {
  let component: NewsArticlesComponent;
  let fixture: ComponentFixture<NewsArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsArticlesComponent]
    });
    fixture = TestBed.createComponent(NewsArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
