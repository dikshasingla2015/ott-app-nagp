import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/interfaces/movie.model';

@Component({
  selector: 'app-view-watched-list',
  templateUrl: './view-watched-list.component.html',
  styleUrls: ['./view-watched-list.component.scss']
})
export class ViewWatchedListComponent implements OnInit {

  watchedMovies!: Movie[];

  totalRecords!: number;

  page = 1;

  constructor(private readonly route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe((response: any) => {
      this.watchedMovies = response.watchedList;
    });
  }

}
