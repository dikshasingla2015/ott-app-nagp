import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MovieDetailPageComponent } from './components/movie-detail-page/movie-detail-page.component';
import { MovieDataResolver } from './resolvers/movie-data/movie-data.resolver';
import { MovieListResolver } from './resolvers/movie-list/movie-list.resolver';

const routes: Routes = [
  {
    path: '', component: HomePageComponent, resolve: {
      movieList: MovieListResolver
    }
  },
  {
    path: ':movieId', component: MovieDetailPageComponent, resolve: {
      movieData: MovieDataResolver
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
