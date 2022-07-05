import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { PrimePackageService } from 'src/app/core/services/Prime/prime-package.service';

import { PrimePackageResolver } from './prime-package.resolver';

describe('PrimePackageResolver', () => {
  let resolver: PrimePackageResolver;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PrimePackageService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    resolver = TestBed.inject(PrimePackageResolver);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.expectOne('/assets/templates/' + 'prime-packages.json').flush(null, { status: 200, statusText: 'Ok' });
    backend.verify();
  }));

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
