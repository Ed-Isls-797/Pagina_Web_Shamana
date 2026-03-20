import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.html',
  styles: [`
    .toast-neutron { position: fixed; top: 30px; right: 30px; z-index: 9999; opacity: 0; visibility: hidden; transition: 0.4s; }
    .show-toast { opacity: 1; visibility: visible; }
  `]
})
export class Payments {
  toastVisible = false;
  toastMensaje = '';
  historial: any[] = [];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.historial.push({ nombre: file.name, fecha: new Date(), estado: 'Enviado' });
      this.toastMensaje = '[Operación de "Subir comprobante" realizada con éxito.]';
      this.toastVisible = true;
      setTimeout(() => { this.toastVisible = false; }, 3000);
    }
  }
}