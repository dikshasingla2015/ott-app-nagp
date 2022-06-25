import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private previousURL: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  setPreviousURL(previous: string): void {
    this.previousURL.next(previous);
  }

  getPreviousURL(): Observable<string> {
    return this.previousURL.asObservable();
  }
}
