import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailFormComponent } from './email-form/email-form.component';

@NgModule({
  declarations: [InputComponent, EmailFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, EmailFormComponent],
})
export class SharedModule {}
