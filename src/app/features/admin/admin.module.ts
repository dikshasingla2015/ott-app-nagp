import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AddPrimePackageComponent } from './components/add-prime-package/add-prime-package.component';
import { SharedModule } from 'src/app/shared/shared.module';

const components = [
  AddMovieComponent,
  AddPrimePackageComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
