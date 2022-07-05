import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HttpLoaderFactory } from 'src/app/app.module';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { MovieService } from 'src/app/core/services/Movie/movie.service';
import { MovieRatingComponent } from '../movie-rating/movie-rating.component';
import { WriteReviewComponent } from '../write-review/write-review.component';

import { MovieDetailPageComponent } from './movie-detail-page.component';

describe('MovieDetailPageComponent', () => {
  let component: MovieDetailPageComponent;
  let fixture: ComponentFixture<MovieDetailPageComponent>;
  let dummyMovie: Movie;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WriteReviewComponent,
        MovieRatingComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue:
          {
            data: {
              subscribe: (fn: (value: Data) => void) => fn({
                movieData: dummyMovie,
              }),
            }
          }
        },
        MovieService
      ],
      imports: [
        CommonModule,
        RouterTestingModule,
        ButtonModule,
        CardModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        HttpClientModule,
        NgbModule,
        MatSnackBarModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    dummyMovie = {
      id: "2",
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
    };
    fixture = TestBed.createComponent(MovieDetailPageComponent);
    component = fixture.componentInstance;
    component.movieData = dummyMovie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to watched page when clicked on view watched movies', inject([Router], (router: Router) => {
    spyOn(router, 'navigateByUrl').and.stub();
    component.viewAllWatchedMoviesList();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/user/watched');
  }));

  it('should navigate to favorites page when clicked on view favorites movies', inject([Router], (router: Router) => {
    spyOn(router, 'navigateByUrl').and.stub();
    component.viewFavoriteMoviesList();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/user/favorites');
  }));

  it('should navigate to home page when clicked on cancel', inject([Router], (router: Router) => {
    spyOn(router, 'navigateByUrl').and.stub();
    component.onCancelClick();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/movies');
  }));

});
