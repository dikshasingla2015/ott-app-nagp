import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PrimePackage } from '../../interfaces/prime-package.model';

@Injectable({
  providedIn: 'root'
})
export class PrimePackageService {

  primePackageDataSubject = new BehaviorSubject<PrimePackage[]>([]);

  readonly PRIME_PACKAGE_BASE_URL = '/assets/templates';

  constructor(private readonly http: HttpClient) {
    this.getAllPrimePackages().subscribe(data => {
      this.primePackageDataSubject.next(data as PrimePackage[]);
    });
  }

  public getAllPrimePackages(): Observable<PrimePackage[]> {
    const url = `${this.PRIME_PACKAGE_BASE_URL}/prime-packages.json`;
    return this.http.get<PrimePackage[]>(url);
  }

  public getPrimePackages(): Observable<PrimePackage[]> {
    return this.primePackageDataSubject.asObservable();
  }

  public addPrimePackageDetails(packageObj: PrimePackage): Observable<string> {
    const packageList = this.primePackageDataSubject.getValue();
    packageObj.id = (packageList.length + 1).toString();
    packageList.push(packageObj);
    this.primePackageDataSubject.next(packageList);
    return of('Package data added successfully.')
  }

}
