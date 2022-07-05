import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StateData } from '../../interfaces/statedata.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private data: StateData = this.resetData();

  constructor() { }

  setData(data: StateData): void {
    this.data = data;
  }

  getData(): StateData {
    return this.data;
  }

  resetData(): StateData {
    return {
      url: '',
      movieId: '',
      isMarkedAsFavorite: false
    };
  }
}
