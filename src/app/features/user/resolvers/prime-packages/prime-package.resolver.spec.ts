import { TestBed } from '@angular/core/testing';

import { PrimePackageResolver } from './prime-package.resolver';

describe('PrimePackageResolver', () => {
  let resolver: PrimePackageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PrimePackageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
