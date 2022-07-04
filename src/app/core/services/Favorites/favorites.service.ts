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
    this.getAllFavoritesOrWatchedList();
  }

  public getAllFavoritesOrWatchedList(): void {
    const url = `${this.FAVORITES_WATCHED_BASE_URL}/favorite-watched.json`;
    this.http.get<Favorites[]>(url).subscribe(data => {
      this.userFavoriteOrWatchedList.next(data);
    });
  }

  getUserFavoritesMovies(userId: string): Observable<Movie[]> {
    const userFavoriteWatchedList = this.userFavoriteOrWatchedList.getValue();
    const data: Favorites[] = userFavoriteWatchedList.filter(item => item.userId === userId && item.isMarkedAsFavorite);
    return this.getMoviesData(data);
  }

  getUserWatchedMovies(userId: string): Observable<Movie[]> {
    const userFavoriteWatchedList = this.userFavoriteOrWatchedList.getValue();
    const data: Favorites[] = userFavoriteWatchedList.filter(item => item.userId === userId && item.isMarkedAsWatched);
    return this.getMoviesData(data);
  }

  getMoviesData(data: Favorites[]): Observable<Movie[]> {
    const movieList: Movie[] = [];
    data.forEach(item => {
      this.movieService.getMovieData(item.movieId).subscribe(response => {
        movieList.push(response);
      })
    });
    return of(movieList);
  }

  addMovieAsFavorite(dataObj: Favorites): Observable<string> {
    const userFavoriteWatchedList = this.userFavoriteOrWatchedList.getValue();
    let response = this.findIndexofMovieInUserList(dataObj.userId, dataObj.movieId);
    if (response !== -1) {
      userFavoriteWatchedList[response].isMarkedAsFavorite = true;
    } else {
      userFavoriteWatchedList.push(dataObj);
    }
    this.userFavoriteOrWatchedList.next(userFavoriteWatchedList);
    return of('Movie marked as favorite successfully');
  }

  addMovieAsWatched(dataObj: Favorites): Observable<string> {
    const userFavoriteWatchedList = this.userFavoriteOrWatchedList.getValue();
    let response = this.findIndexofMovieInUserList(dataObj.userId, dataObj.movieId);
    if (response !== -1) {
      userFavoriteWatchedList[response].isMarkedAsWatched = true;
    } else {
      userFavoriteWatchedList.push(dataObj);
    }
    this.userFavoriteOrWatchedList.next(userFavoriteWatchedList);
    return of('Movie marked as watched successfully');
  }

  removeMovieAsFavorite(userId: string, movieId: string): Observable<string> {
    const userFavoriteWatchedList = this.userFavoriteOrWatchedList.getValue();
    let response = this.findIndexofMovieInUserList(userId, movieId);
    if (response !== -1) {
      userFavoriteWatchedList[response].isMarkedAsFavorite = false;
      this.userFavoriteOrWatchedList.next(userFavoriteWatchedList);
      return of('Movie removed from favorites successfully');
    }
    return of('No movie found');
  }

  findIndexofMovieInUserList(userId: string, movieId: string): number {
    return this.userFavoriteOrWatchedList.getValue().findIndex(item =>
      item.userId === userId && item.movieId === movieId);
  }

  findMovieInUserList(userId: string, movieId: string): Favorites {
    return this.userFavoriteOrWatchedList.getValue().find(item =>
      item.userId === userId && item.movieId === movieId) as Favorites;
  }

}
