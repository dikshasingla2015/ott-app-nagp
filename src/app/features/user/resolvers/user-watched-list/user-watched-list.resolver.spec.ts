import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { FavoritesService } from 'src/app/core/services/Favorites/favorites.service';

import { UserWatchedListResolver } from './user-watched-list.resolver';

describe('UserWatchedListResolver', () => {
  let resolver: UserWatchedListResolver;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FavoritesService,
        AuthService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    resolver = TestBed.inject(UserWatchedListResolver);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.expectOne('/assets/templates/' + 'movies.json').flush(null, { status: 200, statusText: 'Ok' });
    backend.expectOne('/assets/templates/' + 'favorite-watched.json').flush(null, { status: 200, statusText: 'Ok' });
    backend.verify();
  }));

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
