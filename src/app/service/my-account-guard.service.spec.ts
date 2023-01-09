import { TestBed } from '@angular/core/testing';

import { MyAccountGuardService } from './my-account-guard.service';

describe('MyAccountGuardService', () => {
  let service: MyAccountGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAccountGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
