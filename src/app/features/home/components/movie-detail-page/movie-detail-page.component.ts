import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Favorites } from 'src/app/core/interfaces/favorites.model';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { FavoritesService } from 'src/app/core/services/Favorites/favorites.service';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.scss']
})
export class MovieDetailPageComponent implements OnInit {

  movieData!: Movie;
  isPrimeUser: boolean = false;
  showWatchButton = true;

  markMovieAsFavorite: boolean = false;
  markMovieAsWatched: boolean = false;

  constructor(private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly favoritesService: FavoritesService,
    private readonly translateService: TranslateService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router) {

    this.markMovieAsFavorite = false;
    this.markMovieAsWatched = false;

  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.movieData = data['movieData'];
    });
    if (this.authService.isAuthenticated()) {
      const response = this.favoritesService.findMovieInUserList(this.authService.getUserId(), this.movieData.id);
      if (response !== undefined) {
        this.markMovieAsFavorite = response.isMarkedAsFavorite;
        this.markMovieAsWatched = response.isMarkedAsWatched;
      }
      this.isPrimeUser = this.authService.getUserPrime() !== undefined ? true : false;
    }
    if (this.movieData.isAvailableOnPrime && this.isPrimeUser) {
      this.showWatchButton = true;
    } else if (this.movieData.isAvailableOnPrime && !this.isPrimeUser) {
      this.showWatchButton = false;
    }
  }

  addMovieToFavorite(movieId: string): void {
    const data = {
      userId: this.authService.getUserId(),
      movieId: movieId,
      isMarkedAsFavorite: true,
      isMarkedAsWatched: false
    } as Favorites;
    this.favoritesService.addMovieAsFavorite(data).subscribe(data => {
      this.markMovieAsFavorite = true;
      this.openSnackBar(this.translateService.instant('MOVIE_DETAIL.MOVIE_MARKED_AS_FAVORITE'),
        '', "success-style");
    });
  }

  addMovieToWatchList(movieId: string): void {
    const data = {
      userId: this.authService.getUserId(),
      movieId: movieId,
      isMarkedAsFavorite: false,
      isMarkedAsWatched: true
    } as Favorites;
    this.favoritesService.addMovieAsWatched(data).subscribe(data => {
      this.markMovieAsWatched = true;
    });
  }

  viewFavoriteMoviesList(): void {
    this.router.navigateByUrl('/user/favorites');
  }

  viewAllWatchedMoviesList(): void {
    this.router.navigateByUrl('/user/watched');
  }

  onCancelClick(): void {
    this.router.navigateByUrl('/movies');
  }

  openSnackBar(message: string, action: string, style: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [style],
      verticalPosition: "top",
      horizontalPosition: "right"
    });
  }

}
