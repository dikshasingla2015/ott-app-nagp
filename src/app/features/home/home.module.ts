import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MovieDetailPageComponent } from './components/movie-detail-page/movie-detail-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReviewsComponent } from './components/reviews/reviews.component';

const components = [
  HomePageComponent,
  MainPageComponent,
  MovieDetailPageComponent,
  ReviewsComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule
  ]
})
export class HomeModule { }
