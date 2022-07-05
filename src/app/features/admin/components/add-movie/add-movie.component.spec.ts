import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'primeng/api';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { MovieService } from 'src/app/core/services/Movie/movie.service';
import { AddPrimePackageComponent } from '../add-prime-package/add-prime-package.component';

import { AddMovieComponent } from './add-movie.component';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  let movieService: MovieService;
  let dummyMovies: Movie[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddMovieComponent
      ],
      providers: [
        MovieService
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        SharedModule
      ]
    })
      .compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
