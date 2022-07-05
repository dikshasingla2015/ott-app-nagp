import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HttpLoaderFactory } from 'src/app/app.module';
import { PrimePackage } from 'src/app/core/interfaces/prime-package.model';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { TakePrimeMembershipComponent } from './take-prime-membership.component';

describe('TakePrimeMembershipComponent', () => {
  let component: TakePrimeMembershipComponent;
  let fixture: ComponentFixture<TakePrimeMembershipComponent>;
  let dummyPackage: PrimePackage[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TakePrimeMembershipComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue:
          {
            data: {
              subscribe: (fn: (value: Data) => void) => fn({
                primePackagesList: dummyPackage,
              }),
            }
          }
        },
        AuthService,
        UserService
      ],
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        ButtonModule,
        CardModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        HttpClientModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    dummyPackage = [
      {
        id: "1",
        name: "Mobile Only",
        price: 199,
        durationInMonths: 1,
        description: "Exclusive Originals & International Movies"
      }
    ];
    fixture = TestBed.createComponent(TakePrimeMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
