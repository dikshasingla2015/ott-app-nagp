import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpLoaderFactory } from 'src/app/app.module';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { MovieCardComponent } from 'src/app/features/home/components/movie-card/movie-card.component';

import { ViewWatchedListComponent } from './view-watched-list.component';

describe('ViewWatchedListComponent', () => {
  let component: ViewWatchedListComponent;
  let fixture: ComponentFixture<ViewWatchedListComponent>;

  let dummyMovies: Movie[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ViewWatchedListComponent,
        MovieCardComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue:
          {
            data: {
              subscribe: (fn: (value: Data) => void) => fn({
                watchedList: dummyMovies,
              }),
            }
          }
        }
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        HttpClientModule,
        NgxPaginationModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    dummyMovies = [
      {
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
      }
    ];
    fixture = TestBed.createComponent(ViewWatchedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
