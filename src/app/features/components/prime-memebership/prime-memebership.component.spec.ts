import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeMemebershipComponent } from './prime-memebership.component';

describe('PrimeMemebershipComponent', () => {
  let component: PrimeMemebershipComponent;
  let fixture: ComponentFixture<PrimeMemebershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeMemebershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeMemebershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
