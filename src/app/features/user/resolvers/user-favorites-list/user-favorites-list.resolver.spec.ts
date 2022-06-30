import { TestBed } from '@angular/core/testing';

import { UserFavoritesListResolver } from './user-favorites-list.resolver';

describe('UserFavoritesListResolver', () => {
  let resolver: UserFavoritesListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserFavoritesListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
