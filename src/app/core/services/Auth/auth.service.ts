import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../interfaces/user.model';

const USER_NAME_KEY = 'AuthUserName';

const USER_ROLE_KEY = 'AuthUserRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  isAdminSubject = new BehaviorSubject<boolean>(this.isAdmin());

  constructor() { }

  public signOut(): void {
    localStorage.removeItem(USER_NAME_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
    localStorage.clear();
    this.isLoginSubject.next(false);
    this.isAdminSubject.next(false);
  }

  public saveUserName(username: string): void {
    localStorage.removeItem(USER_NAME_KEY);
    localStorage.setItem(USER_NAME_KEY, username);
  }

  public saveUserRole(userRole: string): void {
    localStorage.removeItem(USER_ROLE_KEY);
    localStorage.setItem(USER_ROLE_KEY, userRole);
  }

  public getUsername(): any {
    return localStorage.getItem(USER_NAME_KEY);
  }

  public getUserRole(): any {
    return localStorage.getItem(USER_ROLE_KEY);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  public isLoggedInAsAdmin(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  public login(user: User): Observable<string> {
    this.saveUserName(user.userName);
    this.saveUserRole(user.role);
    this.isLoginSubject.next(true);
    return of('User Logged in Successfully.');
  }

  public isAuthenticated(): boolean {
    if (this.getUsername() !== null) {
      return true;
    }
    return false;
  }

  public isAdmin(): boolean {
    const userRole = this.getUserRole();
    if (this.getUsername() !== null && userRole !== null && userRole === 'admin') {
      return true;
    }
    return false;
  }
  
}
