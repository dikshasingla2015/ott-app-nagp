import { TestBed } from '@angular/core/testing';

import { MovieDataResolver } from './movie-data.resolver';

describe('MovieDataResolver', () => {
  let resolver: MovieDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MovieDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
