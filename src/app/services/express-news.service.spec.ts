import { TestBed } from '@angular/core/testing';

import { ExpressNewsService } from './express-news.service';

describe('ExpressNewsServicExpressNewsServiceeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpressNewsService = TestBed.get(ExpressNewsService);
    expect(service).toBeTruthy();
  });
});
