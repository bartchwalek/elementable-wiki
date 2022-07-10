import { TestBed } from '@angular/core/testing';

import { ElementStatusService } from './element-status.service';

describe('ElementStatusService', () => {
  let service: ElementStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
