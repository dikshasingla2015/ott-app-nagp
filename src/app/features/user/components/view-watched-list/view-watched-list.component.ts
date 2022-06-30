import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { AuthService } from 'src/app/core/services/Auth/auth.service';

@Component({
  selector: 'app-view-watched-list',
  templateUrl: './view-watched-list.component.html',
  styleUrls: ['./view-watched-list.component.scss']
})
export class ViewWatchedListComponent implements OnInit {

  watchedMovies!: Movie[];

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    
  }

}
