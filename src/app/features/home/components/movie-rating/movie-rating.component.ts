import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss']
})
export class MovieRatingComponent implements OnInit {

  @Input()
  imdbRating!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
