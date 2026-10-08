import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactMessage, PortfolioService } from '../../services/portfolio.service';

import { TranslatePipe } from '../../pipes/translate.pipe';

type SubmitStatus = 'idle' | 'success' | 'limited' | 'error';

const emptyForm = (): ContactMessage => ({ name: '', email: '', subject: '', message: '', website: '' });

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  formData: ContactMessage = emptyForm();

  isSubmitting = false;
  status: SubmitStatus = 'idle';

  constructor(private portfolioService: PortfolioService) {}

  onSubmit(form: NgForm) {
    if (this.isSubmitting || form.invalid) return;

    this.isSubmitting = true;
    this.status = 'idle';
    const message: ContactMessage = {
      name: this.formData.name.trim(),
      email: this.formData.email.trim(),
      subject: this.formData.subject.trim(),
      message: this.formData.message.trim(),
      website: this.formData.website,
    };

    this.portfolioService.sendContact(message).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.status = 'success';
        this.formData = emptyForm();
        form.resetForm(this.formData);
      },
      error: (error: unknown) => {
        this.isSubmitting = false;
        this.status = error instanceof HttpErrorResponse && error.status === 429 ? 'limited' : 'error';
      },
    });
  }
}
