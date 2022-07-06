import { TestBed } from '@angular/core/testing';
import { StateData } from '../../interfaces/statedata.model';

import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;
  let dummyData!: StateData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationService);
    dummyData = {
      url: '/movies/1',
      movieId: '1',
      isMarkedAsFavorite: false
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should set data for navgation', () => {
    service.setData(dummyData);
    const data = service.getData();
    expect(data.url).toBe(dummyData.url);
    expect(data.movieId).toEqual(dummyData.movieId);
  });

  it('Should get data for navgation', () => {
    const data = service.getData();
    expect(data.url).toBe('');
    expect(data.movieId).toEqual('');
  });

  it('Should reset data for navgation', () => {
    const data = service.resetData();
    expect(data.url).toBe('');
    expect(data.movieId).toEqual('');
  });
});
