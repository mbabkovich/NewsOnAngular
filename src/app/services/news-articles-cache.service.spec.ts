import { TestBed } from '@angular/core/testing';

import { NewsArticlesCacheService } from './news-articles-cache.service';

describe('NewsArticlesCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsArticlesCacheService = TestBed.get(NewsArticlesCacheService);
    expect(service).toBeTruthy();
  });
});
