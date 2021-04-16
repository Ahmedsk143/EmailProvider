import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signiin',
  templateUrl: './signiin.component.html',
  styleUrls: ['./signiin.component.scss'],
})
export class SigniinComponent implements OnInit {
  signinForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
  });
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit() {
    this.authService.signin(this.signinForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
        console.log('next');
      },
      error: (errRes) => {
        if (errRes.error.password || errRes.error.username) {
          this.signinForm.setErrors({ wrongUserOrPas: true });
        } else {
          this.signinForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
