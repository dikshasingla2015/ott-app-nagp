import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from 'src/app/core/guards/admin-auth.guard';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AddPrimePackageComponent } from './components/add-prime-package/add-prime-package.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'add-movie', component: AddMovieComponent, canActivate: [AdminAuthGuard]
      },
      {
        path: 'add-prime-package', component: AddPrimePackageComponent, canActivate: [AdminAuthGuard]
      }
    ],
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
