import { TestBed } from '@angular/core/testing';

import { FreeapifetchService } from './freeapifetch.service';

describe('FreeapifetchService', () => {
  let service: FreeapifetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeapifetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
