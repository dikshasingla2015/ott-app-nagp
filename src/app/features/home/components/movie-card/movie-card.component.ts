import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/core/interfaces/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input()
  movieData!: Movie;
  
  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  viewMovieDescription(movieId: string): void {
    this.router.navigateByUrl('/home/viewmovie/' + movieId);
  }

}
