import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { ShowCategoryTreeComponent } from './components/show-category-tree/show-category-tree.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { DialogModule } from 'primeng/dialog';
import { OrderListModule } from 'primeng/orderlist';

const components = [
  HeaderComponent,
  FooterComponent,
  SearchMovieComponent,
  ShowCategoryTreeComponent,
  PageLayoutComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule, RouterModule, TranslateModule, MatSnackBarModule, NgxPaginationModule,
    ReactiveFormsModule, CardModule, ButtonModule, NgbModule, DialogModule, OrderListModule
  ],
  exports: [
    ReactiveFormsModule, TranslateModule, MatSnackBarModule, NgxPaginationModule, CardModule,
    ButtonModule, NgbModule, DialogModule, OrderListModule
  ]
})
export class SharedModule { }
