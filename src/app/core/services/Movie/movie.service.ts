import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Movie } from '../../interfaces/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movieDataSubject = new BehaviorSubject<Movie[]>([]);

  readonly MOVIE_SERVICE_BASE_URL = '/assets/templates';

  constructor(private readonly http: HttpClient) {
    this.getMovies().subscribe(data => {
      this.movieDataSubject.next(data);
    });
  }

  public getMovies(): Observable<Movie[]> {
    const url = `${this.MOVIE_SERVICE_BASE_URL}/movies.json`;
    return this.http.get<Movie[]>(url);
  }

  public getAllMovies(): Observable<Movie[]> {
    return this.movieDataSubject.asObservable();
  }

  public getMovieData(movieId: string): Observable<Movie> {
    return this.getAllMovies().pipe(
      map(items => items.filter(item => item.id === movieId)[0]));
  }

  public addMovieDetails(movieObj: Movie): Observable<string> {
    const movieList = this.movieDataSubject.getValue();
    if (this.checkIfMovieNameAlreadyExists(movieList, movieObj.name)) {
      return of('Movie Already Exists.');
    }
    movieObj.id = (movieList.length + 1).toString();
    movieList.push(movieObj);
    this.movieDataSubject.next(movieList);
    return of('Movie data added successfully.')
  }

  public checkIfMovieNameAlreadyExists(movieList: Movie[], movieName: string): Boolean {
    return movieList.find(data => data.name === movieName) !== undefined ? true : false;
  }

  public getMovieDataByName(name: string): void {
    this.getMovies().pipe(
      map(items =>
        items.filter(item =>
          (item.name.toLowerCase()).includes(name.toLowerCase())
        )))
      .subscribe(data => {
        this.movieDataSubject.next(data);
      });
  }

  public getMovieDataByGenre(language: string, genreName: string): void {
    this.getMovies().pipe(
      map(items =>
        items.filter(item =>
          (item.language.toLowerCase().includes(language.toLowerCase())) &&
          (item.genre.toLowerCase()).includes(genreName.toLowerCase())
        )))
      .subscribe(data => {
        this.movieDataSubject.next(data);
      });
  }

  public findMovieIndex(movieList: Movie[], movieId: string): number {
    return movieList.findIndex((obj => obj.id === movieId));
  }

  public addMovieReview(movieId: string, review: string): void {
    const movieList = this.movieDataSubject.getValue();
    const movieIndex = this.findMovieIndex(movieList, movieId);
    movieList[movieIndex].reviews.push(review);
    this.movieDataSubject.next(movieList);
  }

}
