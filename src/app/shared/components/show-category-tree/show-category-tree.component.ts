import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/core/interfaces/category.model';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-show-category-tree',
  templateUrl: './show-category-tree.component.html',
  styleUrls: ['./show-category-tree.component.scss']
})
export class ShowCategoryTreeComponent implements OnInit {

  categoryData: Category[] = [];

  @Output()
  genreText: EventEmitter<string> = new EventEmitter();

  constructor(private readonly categoryService: CategoryService) {
    this.categoryService.getAllMoviesCategory();
    this.categoryService.getCategory().subscribe(data => {
      this.categoryData = data;
    });
  }

  ngOnInit(): void {
  }

  onCategorySelected(category: string): void {
    this.genreText.emit(category);
  }

}
