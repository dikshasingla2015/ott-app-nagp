import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PrimePackageService } from './prime-package.service';

describe('PrimePackageService', () => {
  let service: PrimePackageService;

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
    service = TestBed.inject(PrimePackageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
