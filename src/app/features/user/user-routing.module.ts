import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TakePrimeMembershipComponent } from './components/take-prime-membership/take-prime-membership.component';
import { ViewFavoritesListComponent } from './components/view-favorites-list/view-favorites-list.component';
import { ViewWatchedListComponent } from './components/view-watched-list/view-watched-list.component';
import { PrimePackageResolver } from './resolvers/prime-packages/prime-package.resolver';
import { UserFavoritesListResolver } from './resolvers/user-favorites-list/user-favorites-list.resolver';
import { UserWatchedListResolver } from './resolvers/user-watched-list/user-watched-list.resolver';

const routes: Routes = [
  {
    path: 'favorites', component: ViewFavoritesListComponent, canActivate: [AuthGuard],
    resolve: {
      favoritesList: UserFavoritesListResolver
    }
  },
  {
    path: 'watched', component: ViewWatchedListComponent, canActivate: [AuthGuard],
    resolve: {
      watchedList: UserWatchedListResolver
    }
  },
  {
    path: 'opt-prime', component: TakePrimeMembershipComponent, canActivate: [AuthGuard],
    resolve: {
      primePackagesList: PrimePackageResolver
    }
  },
  {
    path: '**',
    redirectTo: 'movies'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
