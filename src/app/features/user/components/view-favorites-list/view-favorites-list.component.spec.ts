import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { OrderListModule } from 'primeng/orderlist';
import { HttpLoaderFactory } from 'src/app/app.module';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { FavoritesService } from 'src/app/core/services/Favorites/favorites.service';

import { ViewFavoritesListComponent } from './view-favorites-list.component';

describe('ViewFavoritesListComponent', () => {
  let component: ViewFavoritesListComponent;
  let fixture: ComponentFixture<ViewFavoritesListComponent>;

  let dummyMovies: Movie[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ViewFavoritesListComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue:
          {
            data: {
              subscribe: (fn: (value: Data) => void) => fn({
                favoritesList: dummyMovies,
              }),
            }
          }
        },
        AuthService,
        FavoritesService
      ],
      imports: [
        RouterTestingModule,
        OrderListModule,
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
    fixture = TestBed.createComponent(ViewFavoritesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
