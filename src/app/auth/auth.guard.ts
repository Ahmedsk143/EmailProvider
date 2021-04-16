import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { skipWhile, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authSer: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSer.signedIn$.pipe(
      //to skip the null value from being emitted
      skipWhile((value) => value === null),
      //to take only the first emitted value and use complete and igonre any other emmtions
      take(1),
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/signin');
        }
      })
    );
  }
}
