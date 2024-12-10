import { TestBed } from '@angular/core/testing';

import { ContnListService } from './contn-list.service';

describe('ContnListService', () => {
  let service: ContnListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContnListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
