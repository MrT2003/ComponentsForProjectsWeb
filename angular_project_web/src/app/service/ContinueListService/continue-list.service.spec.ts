import { TestBed } from '@angular/core/testing';

import { ContinueListService } from './continue-list.service';

describe('ContinueListService', () => {
  let service: ContinueListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContinueListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
