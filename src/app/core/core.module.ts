import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { ShowCategoryTreeComponent } from './components/show-category-tree/show-category-tree.component';

export class EnsureModuleLoadedOnceGuard {
  constructor(targetModule: any) {
     if (targetModule) {
      console.error("Module already imported");
       throw new Error(`${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`);
     }
  }
}

const components = [
  HeaderComponent,
  FooterComponent,
  SearchMovieComponent,
  ShowCategoryTreeComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
