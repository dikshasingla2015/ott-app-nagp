import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const dummyCategory = [
    {
      name: "English",
      children: [
        {
          name: "Action"
        },
        {
          name: "Comedy"
        },
        {
          name: "Sci-fi"
        },
        {
          name: "Horror"
        }
      ]
    }
  ];

  it('should return an Observable<Category[]>', () => {
    service.getAllMoviesCategory().subscribe(category => {
      expect(category.length).toBe(1);
      expect(category).toEqual(dummyCategory);
    });
    const req = httpTestingController.expectOne(`${service.CATEGORY_SERVICE_BASE_URL}/category.json`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCategory);
  });

});
