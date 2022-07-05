import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { HttpLoaderFactory } from 'src/app/app.module';
import { Movie } from 'src/app/core/interfaces/movie.model';

import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let dummyMovie: Movie;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MovieCardComponent
      ],
      imports: [
        CardModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    dummyMovie = {
      id: "1",
      name: "Thor",
      title: "Thor: Love and Thunder",
      description: "dummy data test case",
      language: "English",
      genre: "Action, Adventure, Comedy",
      imdbRating: 5,
      imageURL: "assets/images/movies/Thor.jpg",
      isAvailableOnPrime: true,
      reviews: [
      ]
    };
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movieData = dummyMovie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct movie data', () => {
    component.movieData = dummyMovie;
    expect(component.movieData.id).toBe('1');
  });

  it('should render each div for product details', () => {
    expect(fixture.debugElement.queryAll(By.css('div')).length).toBe(9);
  });

  it('should navigate to movie description page', inject([Router], (router: Router) => {
    component.movieData = dummyMovie;
    spyOn(router, 'navigateByUrl').and.stub();
    component.viewMovieDescription('1');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/movies/1');
  }));
});
