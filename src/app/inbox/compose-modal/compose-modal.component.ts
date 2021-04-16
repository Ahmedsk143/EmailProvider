import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Email } from '../email-interface';
import { EmailService } from '../email.service';
@Component({
  selector: 'app-compose-modal',
  templateUrl: './compose-modal.component.html',
  styleUrls: ['./compose-modal.component.scss'],
})
export class ComposeModalComponent implements OnInit {
  modalRef: BsModalRef;

  email: Email = {
    id: '',
    subject: '',
    text: '',
    to: '',
    from: '',
    html: '',
  };
  constructor(
    private modalService: BsModalService,
    private emailSer: EmailService
  ) {}

  ngOnInit(): void {}

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
