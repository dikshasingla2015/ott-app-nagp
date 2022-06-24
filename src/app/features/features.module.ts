import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';

import { HomePageComponent } from '../features/components/home-page/home-page.component';
import { MovieDetailPageComponent } from '../features/components/movie-detail-page/movie-detail-page.component';
import { ReviewComponent } from '../features/components/review/review.component';
import { PrimeMemebershipComponent } from '../features/components/prime-memebership/prime-memebership.component';
import { AddMovieComponent } from '../features/components/add-movie/add-movie.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const components = [
  HomePageComponent,
  MovieDetailPageComponent,
  ReviewComponent,
  PrimeMemebershipComponent,
  AddMovieComponent
];

@NgModule({
  declarations: [
    components,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }
