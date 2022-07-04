import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { FavoritesService } from 'src/app/core/services/Favorites/favorites.service';

@Injectable({
  providedIn: 'root'
})
export class UserFavoritesListResolver implements Resolve<Movie[]> {

  constructor(private favoriteService: FavoritesService,
    private authService: AuthService) {

  }
  resolve(): Observable<Movie[]> {
    return this.favoriteService.getUserFavoritesMovies(this.authService.getUserId());
  }
}
