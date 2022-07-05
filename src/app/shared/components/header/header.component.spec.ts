import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { HttpLoaderFactory } from 'src/app/app.module';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { MovieService } from 'src/app/core/services/Movie/movie.service';
import { SearchMovieComponent } from '../search-movie/search-movie.component';
import { ShowCategoryTreeComponent } from '../show-category-tree/show-category-tree.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        SearchMovieComponent,
        ShowCategoryTreeComponent
      ],
      providers: [
        AuthService,
        MovieService
      ],
      imports: [
        CardModule,
        RouterTestingModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
