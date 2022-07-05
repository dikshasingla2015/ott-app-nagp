import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { User } from '../../interfaces/user.model';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  let dummyUsers: User[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  beforeEach(() => {
    dummyUsers = [
      {
        userId: '1',
        userName: 'dummy1',
        phoneNumber: '9876787834',
        password: '123456',
        firstName: 'dummy',
        lastName: '',
        role: 'admin',
        isPrimeMember: false
      }
    ];
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.expectOne('/assets/templates/' + 'users.json').flush(null, { status: 200, statusText: 'Ok' });
    backend.verify();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
