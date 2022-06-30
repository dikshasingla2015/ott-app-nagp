import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFavoritesListComponent } from './view-favorites-list.component';

describe('ViewFavoritesListComponent', () => {
  let component: ViewFavoritesListComponent;
  let fixture: ComponentFixture<ViewFavoritesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFavoritesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFavoritesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
