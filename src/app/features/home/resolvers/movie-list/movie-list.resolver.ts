import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { MovieService } from 'src/app/core/services/Movie/movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieListResolver implements Resolve<any> {

  constructor(private readonly movieService: MovieService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.movieService.getMovies().pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }

}
