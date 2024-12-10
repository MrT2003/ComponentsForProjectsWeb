import { TestBed } from '@angular/core/testing';

import { MenuToggleServiceService } from './menu-toggle-service.service';

describe('MenuToggleServiceService', () => {
  let service: MenuToggleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuToggleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
