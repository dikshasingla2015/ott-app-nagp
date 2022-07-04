import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { FavoritesService } from 'src/app/core/services/Favorites/favorites.service';

@Component({
  selector: 'app-view-watched-list',
  templateUrl: './view-watched-list.component.html',
  styleUrls: ['./view-watched-list.component.scss']
})
export class ViewWatchedListComponent implements OnInit {

  watchedMovies!: Movie[];

  constructor(private readonly route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe((response: any) => {
      this.watchedMovies = response.watchedList;
      console.log(this.watchedMovies);
    });
  }

}
