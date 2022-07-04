import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly CATEGORY_SERVICE_BASE_URL = '/assets/templates';

  constructor(private readonly http: HttpClient) { }

  getAllMoviesCategory(): Observable<Category[]> {
    const url = `${this.CATEGORY_SERVICE_BASE_URL}/category.json`;
    return this.http.get<Category[]>(url);
  }

}
