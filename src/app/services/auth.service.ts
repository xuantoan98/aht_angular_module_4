import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUser } from '../models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  users: IUser[] = [];
  apiUsers = 'http://localhost:3000/users';
  private userState: IUser;

  constructor(private readonly route: Router, private readonly http: HttpClient) {
    this.checkExistingStorage();
    this.initUsers();
  }

  private checkExistingStorage(): void {
    const user = localStorage.getItem('currentUser');
    if(user) {
      this.loggedIn.next(true);
    }
  }

  private initUsers(): Observable<IUser[]> {
    try {
      return this.http.get<IUser[]>(this.apiUsers)
    } catch (error) {
      console.error("Error when fetch book data", error);
      return of();
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(email: string, password: string, rememberMe?: boolean): Observable<boolean> {
    const user = this.users.find(e => e.email === email && e.password === password);
    if(user) {
      this.userState = user;
      this.loggedIn.next(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      rememberMe ? localStorage.setItem('rememberMe', JSON.stringify(user)) : localStorage.removeItem('rememberMe');
      this.route.navigate(['/home']);
      return of(true);
    } else {
      this.loggedIn.next(false);
      return of(false);
    }
  }

  get currentUser() {
    return of( { username: 'ToanKX', articles: ['title-1'] } )
  }
}
