import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuardService implements CanActivate {
  constructor(private authSer: AuthService, private router: Router) {}

  canActivate(): boolean {
    // this.authSer.checkSignin().subscribe(({ authenticated }) => {
    //   if (authenticated) {
    //     this.router.navigateByUrl('/inbox');
    //     alert('You are already signed in! Redirecting..');
    //     return false;
    //   }
    // });
    // you can subsctbie to the subject which is intialized on the app launch, signin, signup componentes
    this.authSer.signedIn$.subscribe((response) => {
      if (response) {
        this.router.navigateByUrl('/inbox');
        return false;
      }
    });
    return true;
  }
}
