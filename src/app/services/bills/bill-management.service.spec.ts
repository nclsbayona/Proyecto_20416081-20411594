import { TestBed } from '@angular/core/testing';

import { BillManagementService } from './bill-management.service';

describe('BillManagementService', () => {
  let service: BillManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
