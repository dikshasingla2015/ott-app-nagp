import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AddPrimePackageComponent } from './components/add-prime-package/add-prime-package.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

const routes: Routes = [
  {
    path: 'add',
    component: AdminPageComponent,
    children: [
      {
        path: 'movie', component: AddMovieComponent, canActivate: [AuthGuard]
      },
      {
        path: 'prime-package', component: AddPrimePackageComponent, canActivate: [AuthGuard]
      }
    ],
  },
  {
    path: '',
    redirectTo: 'add',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
