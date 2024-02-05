import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, of } from 'rxjs';
import { IUser } from '../models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  users$: IUser[] = [];
  apiUsers = 'http://localhost:3000/users';
  private userState$: IUser;

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

  private initUsers(): void {
    try {
      this.http.get<IUser[]>(this.apiUsers).subscribe(
        data => {
          this.users$ = data
        }, 
        error => {
          console.error('Error loading users:', error);
        }
      )
    } catch (error) {
      console.error("Error when fetch book data", error);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.route.navigate(['/login']);
  }

  login(email: string, password: string, rememberMe?: boolean): Observable<boolean> {
    const user = this.users$.find(e => e.email === email && e.password === password);
    if(user) {
      this.userState$ = user;
      this.loggedIn.next(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      rememberMe ? localStorage.setItem('rememberMe', JSON.stringify(user)) : localStorage.removeItem('rememberMe');
      this.route.navigate(['/']);
      return of(true);
    } else {
      this.loggedIn.next(false);
      return of(false);
    }
  }

  get currentUser() {
    return of( { username: 'ToanKX', articles: ['title-1'] } )
  }

  public getName(): Observable<string | null> {
    const userInLocalStorage = localStorage.getItem('currentUser');
    if (userInLocalStorage !== null) {
      const userObject = JSON.parse(userInLocalStorage) as IUser;
      return of(userObject.userName);
    } else if(this.userState$ !== null) {
      const userName =  this.userState$.userName;
      return of(userName);  
    } else {
      return of(null);
    }
  }
}
