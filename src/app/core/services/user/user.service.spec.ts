import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../../interfaces/user.model';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  const dummyUsers: User[] = [
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
