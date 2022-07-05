import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpLoaderFactory } from 'src/app/app.module';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { FavoritesService } from 'src/app/core/services/Favorites/favorites.service';
import { MovieService } from 'src/app/core/services/Movie/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { HomePageComponent } from './home-page.component';
import { CardModule } from 'primeng/card';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let dummyMovies: Movie[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomePageComponent,
        MovieCardComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue:
          {
            data: {
              subscribe: (fn: (value: Data) => void) => fn({
                movieList: dummyMovies,
              }),
            }
          }
        },
        MovieService,
        FavoritesService
      ],
      imports: [
        NgxPaginationModule,
        CardModule,
        RouterTestingModule,
        MatSnackBarModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        HttpClientModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
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
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
