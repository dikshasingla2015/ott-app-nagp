import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly USER_SERVICE_BASE_URL = '/assets/templates';

  userSubject = new BehaviorSubject<User[]>([]);

  constructor(private readonly http: HttpClient) {
    this.getAllUsers();
  }

  public getAllUsers(): Observable<User[]> {
    const url = `${this.USER_SERVICE_BASE_URL}/users.json`;
    this.http.get<User[]>(url).subscribe(users => {
      this.userSubject.next(users as User[]);
    });
    return this.userSubject.asObservable();
  }

  public getUserData(userName: string, password: string): Observable<User> {
    return this.getAllUsers().pipe(
      map(items =>
        items.filter(item => item.userName === userName && item.password === password)[0]));
  }

  public addUserData(user: User): Observable<string> {
    const userData = this.userSubject.getValue();
    if (this.checkIfUserAlreadyExists(userData, user.userName)) {
      return of('User Already Exists.');
    }
    user.userId = (userData.length + 1).toString();
    userData.push(user);
    this.userSubject.next(userData);
    return of('User Created Successfully.');
  }

  public checkIfUserAlreadyExists(userData: User[], userName: string): Boolean {
    return userData.find(data => data.userName === userName) !== undefined ? true : false;
  }

}
