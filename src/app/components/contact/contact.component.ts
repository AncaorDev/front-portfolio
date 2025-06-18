import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  formData: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    // Simular envío del formulario
    setTimeout(() => {
      console.log('Formulario enviado:', this.formData);

      // Aquí normalmente enviarías los datos a un servicio
      // Por ahora solo simulamos el envío

      // Resetear formulario
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };

      this.isSubmitting = false;

      // Mostrar mensaje de éxito (podrías usar un toast o alert)
      alert('¡Mensaje enviado con éxito! Te responderé pronto.');
    }, 2000);
  }
}
