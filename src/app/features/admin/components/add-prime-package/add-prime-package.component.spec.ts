import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrimePackageComponent } from './add-prime-package.component';

describe('AddPrimePackageComponent', () => {
  let component: AddPrimePackageComponent;
  let fixture: ComponentFixture<AddPrimePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrimePackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrimePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
