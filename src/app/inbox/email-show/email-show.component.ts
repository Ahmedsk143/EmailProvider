import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email-interface';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.scss'],
})
export class EmailShowComponent implements OnInit {
  email: Email;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { FetchedEmail: Email }) => {
      this.email = data.FetchedEmail;
    });
  }

  // Normal Sanitze withour the html pipe
  // getSantizedHTML(content: string) {
  //   let html = this.sanitizer.bypassSecurityTrustHtml(content);
  //   return html;
  // }
}
