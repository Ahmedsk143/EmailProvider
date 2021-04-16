import { Component, OnInit } from '@angular/core';
import { EmailService, EmailSummery } from '../email.service';
@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.scss'],
})
export class EmailIndexComponent implements OnInit {
  emails: EmailSummery[];
  randomDay: number;
  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.emailService.getEmails().subscribe((emails) => {
      this.emails = emails;
    });
    this.randomDay = this.getRandomDay();
  }
  getRandomDay() {
    return Math.ceil(Math.random() * 10);
  }
}
