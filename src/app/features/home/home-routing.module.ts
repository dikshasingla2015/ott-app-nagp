import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MovieDetailPageComponent } from './components/movie-detail-page/movie-detail-page.component';
import { MovieDataResolver } from './resolvers/movie-data/movie-data.resolver';
import { MovieListResolver } from './resolvers/movie-list/movie-list.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: MainPageComponent,
    children: [
      {
        path: '', component: HomePageComponent, resolve: {
          productList: MovieListResolver
        }
      },
      {
        path: 'viewmovie/:movieId', component: MovieDetailPageComponent, resolve: {
          productData: MovieDataResolver
        }
      }
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('../../auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import('../user/user.module').then(m => m.UserModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
