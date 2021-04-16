import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { match } from '../match';
import { Unique } from '../unique';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ],
        [this.unique.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
    },
    [this.matchValidatior.validate]
  );

  constructor(
    private matchValidatior: match,
    private unique: Unique,
    private authServ: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.signupForm);

    this.authServ.signUp(this.signupForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: (err) => {
        if (err.status == 0) {
          this.signupForm.setErrors({ connectionError: true });
        } else {
          this.signupForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
