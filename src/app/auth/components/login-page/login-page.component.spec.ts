import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { HttpLoaderFactory } from 'src/app/app.module';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { of } from 'rxjs';

import { LoginPageComponent } from './login-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  let mockAuthService: AuthService;
  let mockUserService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginPageComponent
      ],
      providers: [
        AuthService,
        UserService,
        TranslateService
      ],
      imports: [
        ReactiveFormsModule,
        ButtonModule,
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    mockUserService = fixture.debugElement.injector.get(UserService);
    spyOn(mockUserService, 'getUserData').and.callFake(() => {
      return of({
        userId: '1',
        userName: 'abc123@nagarro.com',
        phoneNumber: '9834125612',
        password: 'abc123',
        firstName: 'string',
        lastName: 'string',
        role: 'role',
        isPrimeMember: true
      });
    });
    mockAuthService = fixture.debugElement.injector.get(AuthService);
    spyOn(mockAuthService, 'login').and.callFake(() => {
      return of('');
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
