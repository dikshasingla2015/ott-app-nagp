import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AddPrimePackageComponent } from './components/add-prime-package/add-prime-package.component';

import { TranslateModule } from '@ngx-translate/core';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const components = [
  AddMovieComponent,
  AddPrimePackageComponent,
  AdminPageComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslateModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
