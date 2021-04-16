import { Injectable } from '@angular/core';
import { Validator, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class match implements Validator {
  validate(form: FormGroup) {
    const { password, passwordConfirmation } = form.value;

    if (password === passwordConfirmation) {
      return null;
    } else {
      return { passwordNoMatch: true };
    }
  }
}
