import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class Unique implements AsyncValidator {
  constructor(private authSer: AuthService) {}

  validate = (username: FormControl) => {
    const { value } = username;
    return this.authSer.checkUsername(value).pipe(
      map((responseValue) => {
        if (responseValue.available) {
          return null;
        }
      }),
      catchError((err) => {
        if (err.error.username) {
          return of({ notUnique: true });
        } else {
          return of({ connectionError: true });
        }
      })
    );
  };
}
