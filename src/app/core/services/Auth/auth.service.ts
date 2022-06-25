import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginDetails } from '../../interfaces/logindetails.model';

const USER_NAME_KEY = 'AuthUserName';

const USER_ROLE_KEY = 'AuthUserRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor() { }

  public signOut(): void {
    localStorage.removeItem(USER_NAME_KEY);
    localStorage.clear();
    this.isLoginSubject.next(false);
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

  public login(user: LoginDetails): Observable<string> {
    this.saveUserName(user.username);
    this.saveUserRole(user.userRole);
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
