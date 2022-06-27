import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { MovieService } from 'src/app/core/services/Movie/movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieListResolver implements Resolve<Movie[]> {

  constructor(private readonly movieService: MovieService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie[]> {
    return this.movieService.getMovies();
  }

}
