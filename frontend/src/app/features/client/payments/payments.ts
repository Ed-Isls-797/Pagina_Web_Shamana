import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../../services/reservation.service';
import { NotificationService } from '../../../services/notification'; 

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.html',
  styles: [`
    /* 🔥 EL DISEÑO CALCADO DE TU REFERENCIA (VERSIÓN CYAN) 🔥 */
    .upload-zone-custom {
      border: 1.5px dashed rgba(13, 202, 240, 0.6); /* Borde punteado cyan */
      background-color: transparent;
      border-radius: 16px;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .upload-zone-custom:hover {
      background-color: rgba(13, 202, 240, 0.03);
      border-color: #0dcaf0;
      box-shadow: 0 0 20px rgba(13, 202, 240, 0.1) inset;
    }

    .icon-circle-custom {
      width: 60px; height: 60px;
      border-radius: 50%;
      background-color: rgba(13, 202, 240, 0.1);
      color: #0dcaf0;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto;
      transition: transform 0.3s ease;
    }

    .upload-zone-custom:hover .icon-circle-custom {
      transform: translateY(-5px);
      box-shadow: 0 0 15px rgba(13, 202, 240, 0.3);
    }

    .btn-glow-cyan {
      background-color: #0dcaf0;
      color: #000;
      font-weight: 700;
      border: none;
      border-radius: 8px;
      padding: 0.6rem 2rem;
      transition: all 0.3s;
      box-shadow: 0 0 15px rgba(13, 202, 240, 0.4); /* Brillo del botón */
    }

    .btn-glow-cyan:hover {
      box-shadow: 0 0 25px rgba(13, 202, 240, 0.7);
      transform: scale(1.02);
      background-color: #1cf;
    }

    /* Estilos del Historial y el Toast */
    .historial-item { border-bottom: 1px solid #222; transition: 0.2s; }
    .historial-item:hover { background-color: #0f0f11; }
    .historial-item:last-child { border-bottom: none; }
    .badge-confirmado { background-color: rgba(25, 135, 84, 0.1); color: #198754; border: 1px solid #198754; }
    .badge-rechazado { background-color: rgba(220, 53, 69, 0.1); color: #dc3545; border: 1px solid #dc3545; }
    .badge-pendiente { background-color: rgba(13, 202, 240, 0.1); color: #0dcaf0; border: 1px solid #0dcaf0; }

    .toast-neutron { position: fixed; top: 30px; right: 30px; z-index: 9999999; opacity: 0; visibility: hidden; transform: translateY(-20px); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .toast-neutron.show-toast { opacity: 1; visibility: visible; transform: translateY(0); }
  `]
})
export class Payments implements OnInit {

  historial: any[] = [];
  toastVisible = false;
  toastMensaje = '';

  constructor(
    private reservationService: ReservationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // Aquí puedes cargar un historial inicial si quieres
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const imagenBase64 = e.target.result;
      
      this.historial.unshift({
        nombre: file.name,
        fecha: new Date().toISOString().split('T')[0] + ' - Reciente',
        estado: 'Pendiente'
      });

      this.notificationService.enviarNotificacionAdmin(
        'Comprobante Recibido', 
        `El cliente acaba de subir su ticket de pago: ${file.name}.`, 
        'pago',
        imagenBase64
      );

      this.mostrarToast(`[Operación de "Subir comprobante" realizada con éxito.]`);
    };

    reader.readAsDataURL(file);
  }

  mostrarToast(mensaje: string) {
    this.toastMensaje = mensaje;
    this.toastVisible = true;
    setTimeout(() => { this.toastVisible = false; }, 3500);
  }
}