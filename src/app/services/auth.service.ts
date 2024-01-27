import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

  get currentUser() {
    return of( { username: 'ToanKX', articles: ['title-1'] } )
  }
}
