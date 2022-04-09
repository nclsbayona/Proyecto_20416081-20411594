import { TestBed } from '@angular/core/testing';

import { CookieManagementService } from './cookie-management.service';

describe('CookieManagementService', () => {
  let service: CookieManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
