import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AddPrimePackageComponent } from './components/add-prime-package/add-prime-package.component';

import { TranslateModule } from '@ngx-translate/core';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

const components = [
  AddMovieComponent,
  AddPrimePackageComponent
];

@NgModule({
  declarations: [
    components,
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslateModule
  ]
})
export class AdminModule { }
