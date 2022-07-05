import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Movie } from '../../interfaces/movie.model';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let dummyMovies: Movie[];
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    dummyMovies = [
      {
        id: "1",
        name: "Thor",
        title: "Thor: Love and Thunder",
        description: "Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
        language: "English",
        genre: "Action, Adventure, Comedy",
        imdbRating: 5,
        imageURL: "assets/images/movies/Thor.jpg",
        isAvailableOnPrime: true,
        reviews: [
        ]
      }
    ];
    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.expectOne('/assets/templates/' + 'movies.json').flush(null, { status: 200, statusText: 'Ok' });
    backend.verify();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should return an Observable<Movie[]>', () => {
  //   service.getMovies().subscribe(movie => {
  //     expect(dummyMovies.length).toBe(1);
  //     expect(movie).toEqual(dummyMovies);
  //   });
  //   const req = httpTestingController.expectOne(`${service.MOVIE_SERVICE_BASE_URL}/movies.json`);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(dummyMovies);
  // });
});
