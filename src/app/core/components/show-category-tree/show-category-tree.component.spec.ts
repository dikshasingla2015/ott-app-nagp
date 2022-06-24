import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCategoryTreeComponent } from './show-category-tree.component';

describe('ShowCategoryTreeComponent', () => {
  let component: ShowCategoryTreeComponent;
  let fixture: ComponentFixture<ShowCategoryTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCategoryTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCategoryTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
