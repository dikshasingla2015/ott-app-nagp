import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { FavoritesService } from 'src/app/core/services/Favorites/favorites.service';

@Component({
  selector: 'app-view-favorites-list',
  templateUrl: './view-favorites-list.component.html',
  styleUrls: ['./view-favorites-list.component.scss']
})
export class ViewFavoritesListComponent implements OnInit {

  favorites!: Movie[];

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly favoriteService: FavoritesService) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.favorites = response.favoritesList;
    });
  }

  getUserFavorites(): void {
    this.favoriteService.getUserFavoritesMovies(this.authService.getUserId()).subscribe(data => {
      this.favorites = data;
    });
  }

  viewMovieDescription(movieId: string): void {
    this.router.navigateByUrl('/movies/' + movieId);
  }

  removeMovieFromFavorite(movieId: string): void {
    this.favoriteService.removeMovieAsFavorite(this.authService.getUserId(), movieId)
      .subscribe(data => {
        this.getUserFavorites();
      });
  }

}
