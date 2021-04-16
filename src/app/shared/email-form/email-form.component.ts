import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Email } from '../../inbox/email-interface';
@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
})
export class EmailFormComponent implements OnInit {
  @Input() email: Email;
  @Output() sentEmail = new EventEmitter();
  emailForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    const { to, subject, text } = this.email;
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required]),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text),
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    }
    this.sentEmail.emit(this.emailForm.value);
  }
}
