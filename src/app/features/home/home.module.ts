import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MovieDetailPageComponent } from './components/movie-detail-page/movie-detail-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieRatingComponent } from './components/movie-rating/movie-rating.component';

const components = [
  HomePageComponent,
  MainPageComponent,
  MovieDetailPageComponent,
  ReviewsComponent,
  MovieCardComponent
];

@NgModule({
  declarations: [
    components,
    MovieRatingComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxPaginationModule,
    TranslateModule,
    CardModule,
    ButtonModule,
    NgbModule
  ]
})
export class HomeModule { }
