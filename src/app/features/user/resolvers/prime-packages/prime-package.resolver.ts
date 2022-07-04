import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PrimePackage } from 'src/app/core/interfaces/prime-package.model';
import { PrimePackageService } from 'src/app/core/services/Prime/prime-package.service';

@Injectable({
  providedIn: 'root'
})
export class PrimePackageResolver implements Resolve<PrimePackage[]> {

  constructor(private primePackageService: PrimePackageService) {

  }
  resolve(): Observable<PrimePackage[]> {
    return this.primePackageService.getAllPrimePackages();
  }
}
