import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../../interfaces/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryDataSubject = new BehaviorSubject<Category[]>([]);

  readonly CATEGORY_SERVICE_BASE_URL = '/assets/templates';

  constructor(private readonly http: HttpClient) { }

  getAllMoviesCategory(): void {
    const url = `${this.CATEGORY_SERVICE_BASE_URL}/category.json`;
    this.http.get<Category[]>(url).subscribe(data => {
      this.categoryDataSubject.next(data);
    });
  }

  getCategory(): Observable<Category[]> {
    return this.categoryDataSubject.asObservable();
  }

}
