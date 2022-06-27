import { TestBed } from '@angular/core/testing';

import { PrimePackageService } from './prime-package.service';

describe('PrimePackageService', () => {
  let service: PrimePackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimePackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
