import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { CategoryService } from 'src/app/core/services/category/category.service';

import { ShowCategoryTreeComponent } from './show-category-tree.component';

describe('ShowCategoryTreeComponent', () => {
  let component: ShowCategoryTreeComponent;
  let fixture: ComponentFixture<ShowCategoryTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ShowCategoryTreeComponent
      ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        CategoryService
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCategoryTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
