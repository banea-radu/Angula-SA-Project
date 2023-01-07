import { TestBed } from '@angular/core/testing';

import { MyaccountGuardService } from './myaccount-guard.service';

describe('MyaccountGuardService', () => {
  let service: MyaccountGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyaccountGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
