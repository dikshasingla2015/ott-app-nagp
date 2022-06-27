import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/interfaces/movie.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  movies: Movie[] = [];

  totalRecords!: number;

  page = 1;
  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.movies = data['movieList'];
      console.log('Data: ', data)
      console.log('movies Data: ', data['movieList'])
    });

  }

}
