import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { FavoritesService } from 'src/app/core/services/Favorites/favorites.service';
import { MovieService } from 'src/app/core/services/Movie/movie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  movies: Movie[] = [];

  totalRecords!: number;

  page = 1;
  constructor(private readonly route: ActivatedRoute,
    private movieService: MovieService,
    private favoriteService: FavoritesService) { }

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.movies = response.movieList;
    });
    this.movieService.getAllMovies().subscribe(data => {
      this.movies = data;
    });
  }

}
