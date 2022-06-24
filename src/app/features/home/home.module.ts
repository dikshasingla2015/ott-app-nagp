import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MovieDetailPageComponent } from './components/movie-detail-page/movie-detail-page.component';
import { ReviewComponent } from './components/review/review.component';
import { TakePrimeMembershipComponent } from './components/take-prime-membership/take-prime-membership.component';

const components = [
  HomePageComponent,
  MainPageComponent,
  MovieDetailPageComponent,
  ReviewComponent,
  TakePrimeMembershipComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
