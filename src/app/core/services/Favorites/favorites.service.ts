import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Favorites } from '../../interfaces/favorites.model';
import { Movie } from '../../interfaces/movie.model';
import { MovieService } from '../Movie/movie.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  readonly FAVORITES_WATCHED_BASE_URL = '/assets/templates';

  userFavoriteOrWatchedList = new BehaviorSubject<Favorites[]>([]);

  constructor(private movieService: MovieService,
    private readonly http: HttpClient) {
    this.getAllFavoritesOrWatchedList().subscribe(data => {
      this.userFavoriteOrWatchedList.next(data as Favorites[]);
    });
  }

  public getAllFavoritesOrWatchedList(): Observable<Favorites[]> {
    const url = `${this.FAVORITES_WATCHED_BASE_URL}/favorite-watched.json`;
    return this.http.get<Favorites[]>(url);
  }

  getUserFavoritesMovies(userId: string): Observable<Movie[]> {
    const userFavoriteWatchedList = this.userFavoriteOrWatchedList.getValue();
    const data: Favorites[] = userFavoriteWatchedList.filter(item => item.userId === userId && item.isMarkedAsFavorite);
    return this.getMoviesData(data);
  }

  getUserWatchedMovies(userId: string): Observable<Movie[]> {
    const userFavoriteWatchedList = this.userFavoriteOrWatchedList.getValue();
    console.log(userFavoriteWatchedList)
    const data: Favorites[] = userFavoriteWatchedList.filter(item => item.userId === userId && item.isMarkedAsWatched);
    return this.getMoviesData(data);
  }

  getMoviesData(data: Favorites[]): Observable<Movie[]> {
    const movieList: Movie[] = [];
    data.forEach(item => {
      this.movieService.getMovieData(item.movieId).subscribe(response => {
        movieList.push(response);
        console.log(response);
      })
    });
    return of(movieList);
  }

  addMovieAsFavorite(dataObj: Favorites): Observable<string> {
    const userFavoriteWatchedList = this.userFavoriteOrWatchedList.getValue();
    let response = this.findMovieInUserList(userFavoriteWatchedList, dataObj.userId, dataObj.movieId);
    if (response !== undefined) {
      response.isMarkedAsFavorite = true;
      userFavoriteWatchedList.push(response);
    } else {
      userFavoriteWatchedList.push(dataObj);
    }
    this.userFavoriteOrWatchedList.next(userFavoriteWatchedList);
    return of('Movie marked as favorite successfully');
  }

  addMovieAsWatched(dataObj: Favorites): Observable<string> {
    const userFavoriteWatchedList = this.userFavoriteOrWatchedList.getValue();
    let response = this.findMovieInUserList(userFavoriteWatchedList, dataObj.userId, dataObj.movieId);
    if (response !== undefined) {
      response.isMarkedAsWatched = true;
      userFavoriteWatchedList.push(response);
    } else {
      userFavoriteWatchedList.push(dataObj);
    }
    this.userFavoriteOrWatchedList.next(userFavoriteWatchedList);
    return of('Movie marked as watched successfully');
  }

  removeMovieAsFavorite(userId: string, movieId: string): Observable<string> {
    const userFavoriteWatchedList = this.userFavoriteOrWatchedList.getValue();
    let response = this.findMovieInUserList(userFavoriteWatchedList, userId, movieId);
    if (response !== undefined) {
      response.isMarkedAsFavorite = false;
      userFavoriteWatchedList.push(response);
      this.userFavoriteOrWatchedList.next(userFavoriteWatchedList);
      return of('Movie removed from favorites successfully');
    }
    return of('No movie found');
  }

  findMovieInUserList(userFavoriteWatchedList: Favorites[], userId: string, movieId: string) {
    return userFavoriteWatchedList.find(item =>
      item.userId === userId && item.movieId === movieId);
  }

}
