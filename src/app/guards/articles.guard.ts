import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class PermissionsService {

  constructor(private readonly authService: AuthService) {}

  canActivate(): Observable<boolean> {
    // return this.authService.currentUser.pipe(map(user => !!user));
    return of(false)
  }

}

export const articlesGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PermissionsService).canActivate() ? true : false;
};
