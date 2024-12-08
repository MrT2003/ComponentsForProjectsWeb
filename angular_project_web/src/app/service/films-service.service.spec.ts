import { TestBed } from '@angular/core/testing';

import { FilmsServiceService } from './films-service.service';

describe('FilmsServiceService', () => {
  let service: FilmsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
