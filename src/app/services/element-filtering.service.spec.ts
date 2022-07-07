import { TestBed } from '@angular/core/testing';

import { ElementFilteringService } from './element-filtering.service';

describe('ElementFilteringService', () => {
  let service: ElementFilteringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementFilteringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
