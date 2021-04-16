import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { InboxRoutingModule } from './inbox-routing.module';
import { HomeComponent } from './home/home.component';
import { EmailIndexComponent } from './email-index/email-index.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailPlacholderComponent } from './email-placholder/email-placholder.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ComposeModalComponent } from './compose-modal/compose-modal.component';
import { ReplyModalComponent } from './reply-modal/reply-modal.component';
import { SharedModule } from '../shared/shared.module';
import { SafeHtmlPipe } from './safe-html-pipe.pipe';
@NgModule({
  declarations: [
    HomeComponent,
    EmailIndexComponent,
    EmailShowComponent,
    EmailPlacholderComponent,
    NotFoundComponent,
    ComposeModalComponent,
    ReplyModalComponent,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    InboxRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class InboxModule {}
