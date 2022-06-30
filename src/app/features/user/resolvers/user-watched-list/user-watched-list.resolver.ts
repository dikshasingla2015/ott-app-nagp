import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { FavoritesService } from 'src/app/core/services/Favorites/favorites.service';

@Injectable({
  providedIn: 'root'
})
export class UserWatchedListResolver implements Resolve<Movie[]> {

  constructor(private favoriteService: FavoritesService,
    private authService: AuthService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie[]> {
    return this.favoriteService.getUserWatchedMovies(this.authService.getUserId());
  }
}
