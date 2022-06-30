import { TestBed } from '@angular/core/testing';

import { UserWatchedListResolver } from './user-watched-list.resolver';

describe('UserWatchedListResolver', () => {
  let resolver: UserWatchedListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserWatchedListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
