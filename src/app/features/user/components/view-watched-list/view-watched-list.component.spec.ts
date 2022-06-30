import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWatchedListComponent } from './view-watched-list.component';

describe('ViewWatchedListComponent', () => {
  let component: ViewWatchedListComponent;
  let fixture: ComponentFixture<ViewWatchedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWatchedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewWatchedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
