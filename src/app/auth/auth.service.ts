import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface checkUserResponse {
  available: boolean;
}
interface signResponse {
  username: string;
}

interface signUpValue {
  username: string;
  password: string;
  passwordConfirmation: string;
}
interface signInValue {
  username: string;
  password: string;
}
interface signinCheck {
  authenticated: boolean;
  username: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootURL = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject<boolean>(null); // BehvSubject to intialize the null value and use it in the canLoad guard
  username$ = new Subject<string>();

  constructor(private htttp: HttpClient) {}

  //to check the username and return true or false in the prop {avaliable}, it is called in unique validator to check if the username is unique or not
  checkUsername = (value: string) => {
    return this.htttp.post<checkUserResponse>(
      this.rootURL + '/auth/username',
      {
        username: value,
      },
      { withCredentials: true }
    );
  };

  //to signup then tap to emit true in the signIn behaviorSubject and the username in the username subject
  signUp = (values: signUpValue) => {
    return this.htttp
      .post<signResponse>(this.rootURL + '/auth/signup', values, {
        withCredentials: true,
      })
      .pipe(
        tap(({ username }) => {
          this.signedIn$.next(true);
          this.username$.next(username);
        })
      );
  };
  // to do the same as the signup
  signin = (values: signInValue) => {
    return this.htttp
      .post<signResponse>(this.rootURL + '/auth/signin', values, {
        withCredentials: true,
      })
      .pipe(
        tap(({ username }) => {
          this.signedIn$.next(true);
          this.username$.next(username);
        })
      );
  };

  // to check if the user is loggedIn, we call this in the initlizations of the app
  checkSignin() {
    return this.htttp
      .get<signinCheck>(this.rootURL + '/auth/signedin', {
        withCredentials: true,
      })
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedIn$.next(authenticated);
          this.username$.next(username);
        })
      );
  }

  signOut() {
    return this.htttp
      .post(
        this.rootURL + '/auth/signout',
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          this.signedIn$.next(false);
        })
      );
  }
}
