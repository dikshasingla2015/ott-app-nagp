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

  markMovieAsFavorite = false;
  markMovieAsWatched = false;

  constructor(private readonly route: ActivatedRoute,
    private authService: AuthService,
    private favoritesService: FavoritesService,
    private readonly translateService: TranslateService,
    private snackBar: MatSnackBar,
    private readonly router: Router) {

    this.markMovieAsFavorite = false;
    this.markMovieAsWatched = false;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.movieData = data['movieData'];
    });
    if (this.authService.isLoggedIn()) {
      const response = this.favoritesService.findMovieInUserList(this.authService.getUserId(), this.movieData.id);
      this.markMovieAsFavorite = response.isMarkedAsFavorite;
      this.markMovieAsWatched = response.isMarkedAsWatched;
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
      this.openSnackBar(this.translateService.instant('LOGIN.INVALID_CREDS'),//change
        '', "success-style");
      this.markMovieAsFavorite = true;
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
      this.openSnackBar(this.translateService.instant('LOGIN.INVALID_CREDS'),//change
        '', "success-style");
      this.markMovieAsFavorite = true;
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
