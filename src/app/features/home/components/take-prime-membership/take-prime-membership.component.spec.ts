import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakePrimeMembershipComponent } from './take-prime-membership.component';

describe('TakePrimeMembershipComponent', () => {
  let component: TakePrimeMembershipComponent;
  let fixture: ComponentFixture<TakePrimeMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakePrimeMembershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakePrimeMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
