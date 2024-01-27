import { Injectable, inject, runInInjectionContext } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChildFn, CanLoadFn, CanMatchFn, UrlSegment, Route } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class PermissionsService {
  constructor(private readonly authService: AuthService, private readonly route: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.currentUser.pipe(map(user => !!user))
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot, slug: string): Observable<boolean> {
    return this.authService.currentUser.pipe(map(user => user.articles.includes(slug)))
  }

  canMatch(next: Route, segments: UrlSegment[]): Observable<boolean> {
    return of(true);
  }
}

export const canActiveArticle: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PermissionsService).canActivate(route, state);
};

export const canActivateChildArticle: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const targetSlug = route.params['slug'];
  if(!targetSlug) {
    return of(false);
  }
  return inject(PermissionsService).canActivateChild(route, state, targetSlug);
};

export const canMatchArticle: CanMatchFn = (route: Route, segments: UrlSegment[]): Observable<boolean> => {
  return inject(PermissionsService).canMatch(route, segments);
}
