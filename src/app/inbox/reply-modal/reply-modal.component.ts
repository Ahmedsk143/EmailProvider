import { Component, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Email } from '../email-interface';
import { EmailService } from '../email.service';
@Component({
  selector: 'app-reply-modal',
  templateUrl: './reply-modal.component.html',
  styleUrls: ['./reply-modal.component.scss'],
})
export class ReplyModalComponent {
  modalRef: BsModalRef;
  @Input() email: Email;

  constructor(
    private modalService: BsModalService,
    private emailSer: EmailService
  ) {}

  ngOnChanges(): void {
    this.email = {
      id: this.email.id,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n\n RE For: ${this.email.text}`,
      to: this.email.from,
      from: this.email.to,
      html: this.email.html,
    };
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign(
        {},
        { class: 'gray modal-md' },
        {
          animated: true,
        }
      )
    );
  }

  recivedEmail(email: Email) {
    this.modalService.hide();

    this.emailSer.sendEmail(email).subscribe(() => {});
  }
}
