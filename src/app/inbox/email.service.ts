import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from './email-interface';

export interface EmailSummery {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  rootURL = 'https://api.angular-email.com';
  constructor(private http: HttpClient) {}

  getEmails() {
    return this.http.get<EmailSummery[]>(`${this.rootURL}/emails`, {
      withCredentials: true,
    });
  }
  getEmail(id: string) {
    return this.http.get<Email>(`${this.rootURL}/emails/${id}`, {
      withCredentials: true,
    });
  }
  sendEmail(email: Email) {
    return this.http.post(`${this.rootURL}/emails`, email, {
      withCredentials: true,
    });
  }
}
