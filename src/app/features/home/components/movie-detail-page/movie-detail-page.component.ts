import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Favorites } from 'src/app/core/interfaces/favorites.model';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { StateData } from 'src/app/core/interfaces/statedata.model';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { FavoritesService } from 'src/app/core/services/Favorites/favorites.service';
import { MovieService } from 'src/app/core/services/Movie/movie.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.scss']
})
export class MovieDetailPageComponent implements OnInit {

  movieData!: Movie;
  isPrimeUser: boolean = false;
  showWatchButton: boolean = true;
  markMovieAsFavorite: boolean = false;
  markMovieAsWatched: boolean = false;

  constructor(private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly favoritesService: FavoritesService,
    private readonly translateService: TranslateService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly movieService: MovieService,
    private readonly navigationService: NavigationService) {

    this.markMovieAsFavorite = false;
    this.markMovieAsWatched = false;

  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.movieData = data['movieData'];
    });
    if (this.movieData === undefined) {
      this.route.paramMap.subscribe(data => {
        const movieId = data.get('movieId');
        this.movieService.getMovieData(movieId!).subscribe(data => {
          this.movieData = data;
        });
      });
    }
    this.favOrWatchedFlagsProcessing();
  }

  favOrWatchedFlagsProcessing() {
    if (this.authService.isAuthenticated()) {
      const response = this.favoritesService.findMovieInUserList(this.authService.getUserId(), this.movieData.id);
      if (response !== undefined) {
        this.markMovieAsFavorite = response.isMarkedAsFavorite;
        this.markMovieAsWatched = response.isMarkedAsWatched;
      }
      this.isPrimeUser = this.authService.getUserPrime() !== null ? true : false;
    }
    if (this.movieData.isAvailableOnPrime && this.isPrimeUser) {
      this.showWatchButton = true;
    } else if (this.movieData.isAvailableOnPrime && !this.isPrimeUser) {
      this.showWatchButton = false;
    }
  }

  addMovieToFavorite(movieId: string): void {
    if (this.authService.isAuthenticated()) {
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
    } else {
      this.addStateToNavigation(true);
    }
  }

  addMovieToWatchList(movieId: string): void {
    if (this.authService.isAuthenticated()) {
      const data = {
        userId: this.authService.getUserId(),
        movieId: movieId,
        isMarkedAsFavorite: false,
        isMarkedAsWatched: true
      } as Favorites;
      this.favoritesService.addMovieAsWatched(data).subscribe(data => {
        this.markMovieAsWatched = true;
      });
    } else {
      this.addStateToNavigation(false);
    }
  }

  addStateToNavigation(favoriteFlag: boolean): void {
    const data: StateData = {
      url: '/movies/' + this.movieData.id,
      movieId: this.movieData.id,
      isMarkedAsFavorite: favoriteFlag
    };
    this.navigationService.setData(data);
    this.router.navigateByUrl('/auth/login');
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
