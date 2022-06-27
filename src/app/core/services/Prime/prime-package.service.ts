import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { PrimePackage } from '../../interfaces/prime-package.model';

@Injectable({
  providedIn: 'root'
})
export class PrimePackageService {

  primePackageDataSubject = new BehaviorSubject<PrimePackage[]>([]);

  readonly PRIME_PACKAGE_BASE_URL = '/assets/templates';

  constructor(private readonly http: HttpClient) {
    this.getAllPrimePackages();
  }

  public getAllPrimePackages(): Observable<PrimePackage[]> {
    const url = `${this.PRIME_PACKAGE_BASE_URL}/prime-packages.json`;
    this.http.get<PrimePackage[]>(url).subscribe(data => {
      this.primePackageDataSubject.next(data as PrimePackage[]);
    });
    return this.primePackageDataSubject.asObservable();
  }

  public getPrimePackages(): Observable<PrimePackage[]> {
    return this.primePackageDataSubject.asObservable();
  }

  public getPrimePackageData(id: string): Observable<PrimePackage> {
    return this.getPrimePackages().pipe(
      map(items => items.filter(item => item.id === id)[0]));
  }

  public addPrimePackageDetails(packageObj: PrimePackage): Observable<string> {
    const packageList = this.primePackageDataSubject.getValue();
    packageObj.id = (packageList.length + 1).toString();
    packageList.push(packageObj);
    this.primePackageDataSubject.next(packageList);
    return of('Package data added successfully.')
  }

  public updatePrimePackageDetails(packageObj: PrimePackage): Observable<string> {
    const packageList = this.primePackageDataSubject.getValue();
    const packageIndex = this.findPackageByIndex(packageList, packageObj.id);
    packageList[packageIndex] = packageObj;
    this.primePackageDataSubject.next(packageList);
    return of('Package data updated successfully.')
  }

  public deletePrimePackageDetails(id: string): Observable<string> {
    const packageList = this.primePackageDataSubject.getValue();
    const packageIndex = this.findPackageByIndex(packageList, id);
    packageList.splice(packageIndex, 1);
    this.primePackageDataSubject.next(packageList);
    return of('Package data deleted successfully.')
  }

  public findPackageByIndex(packageList: PrimePackage[], id: string): number {
    return packageList.findIndex((obj => obj.id === id));
  }

}
