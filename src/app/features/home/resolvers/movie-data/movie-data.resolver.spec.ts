import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieService } from 'src/app/core/services/Movie/movie.service';

import { MovieDataResolver } from './movie-data.resolver';

describe('MovieDataResolver', () => {
  let resolver: MovieDataResolver;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    resolver = TestBed.inject(MovieDataResolver);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.expectOne('/assets/templates/' + 'movies.json').flush(null, { status: 200, statusText: 'Ok' });
    backend.verify();
  }));
  
  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
