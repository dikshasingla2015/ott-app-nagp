import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MovieDetailPageComponent } from './components/movie-detail-page/movie-detail-page.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieRatingComponent } from './components/movie-rating/movie-rating.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WriteReviewComponent } from './components/write-review/write-review.component';

const components = [
  HomePageComponent,
  MovieDetailPageComponent,
  ReviewsComponent,
  MovieCardComponent,
  MovieRatingComponent,
  WriteReviewComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  exports: [
    MovieCardComponent
  ]
})
export class HomeModule { }
