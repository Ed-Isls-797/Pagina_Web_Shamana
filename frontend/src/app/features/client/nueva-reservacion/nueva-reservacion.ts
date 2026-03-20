import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { NotificationService } from '../../../services/notification'; 

@Component({
  selector: 'app-nueva-reservacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-reservacion.html',
  styles: [`
    .fondo-modal {
      background: rgba(0,0,0,0.75);
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      z-index: 1050;
      backdrop-filter: blur(6px);
    }
    .card-neon-cyan {
      background-color: #09090b; /* Súper oscuro, nivel premium */
      border: 1px solid #1f1f23; /* Borde sutil */
      border-radius: 16px;
      width: 100%; max-width: 440px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.7);
    }

    /* 🔥 CAJITAS DE LOS INPUTS IDENTICAS 🔥 */
    .input-group-custom {
      display: flex;
      align-items: center;
      background-color: #0f0f12; /* Ligeramente más claro que el fondo */
      border: 1px solid #1f1f23;
      border-radius: 8px;
      transition: all 0.3s ease;
      overflow: hidden;
    }
    
    .input-group-custom:focus-within {
      border-color: #0dcaf0; /* CYAN */
      box-shadow: 0 0 0 1px #0dcaf0;
    }

    .input-icon {
      padding: 0 12px 0 16px;
      color: #71717a; /* Gris elegante para el ícono */
      display: flex;
      align-items: center;
    }

    .input-dark {
      background-color: transparent;
      color: #f4f4f5;
      border: none;
      padding: 0.85rem 1rem 0.85rem 0;
      width: 100%;
      outline: none;
      font-size: 0.95rem;
    }
    
    .input-dark::placeholder { color: #71717a; }
    .input-dark option { background-color: #0f0f12; color: white; }

    /* 🔥 LOS BOTONES CALCADOS (EN CYAN) 🔥 */
    .btn-cyan {
      background-color: #0dcaf0;
      color: #000;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      padding: 0.85rem;
      transition: all 0.3s;
      width: 100%;
      box-shadow: 0 0 15px rgba(13, 202, 240, 0.25); /* Glow Cyan */
    }
    .btn-cyan:hover {
      box-shadow: 0 0 25px rgba(13, 202, 240, 0.5);
      background-color: #1cf;
    }

    .btn-cancel {
      background-color: transparent;
      color: #a1a1aa;
      border: 1px solid #1f1f23; /* Borde calcado de tu foto */
      font-weight: 600;
      border-radius: 8px;
      padding: 0.85rem;
      transition: 0.3s;
      width: 100%;
    }
    .btn-cancel:hover { color: white; border-color: #3f3f46; background-color: rgba(255,255,255,0.02); }

    /* Toast */
    .toast-neutron { position: fixed; top: 30px; right: 30px; z-index: 9999999; opacity: 0; visibility: hidden; transform: translateY(-20px); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .toast-neutron.show-toast { opacity: 1; visibility: visible; transform: translateY(0); }
  `]
})
export class NuevaReservacion {

  fechasDisponibles: string[] = [
    'viernes, 23 de octubre de 2026, 9:00 PM',
    'sábado, 24 de octubre de 2026, 10:00 PM',
    'viernes, 30 de octubre de 2026, 8:00 PM',
    'viernes, 6 de noviembre de 2026, 11:00 PM'
  ];

  form = { nombre: '', fecha: '', personas: 1, zona: '' };

  toastVisible = false;
  toastMensaje = '';

  constructor(
    private reservationService: ReservationService,
    private notificationService: NotificationService, 
    private router: Router
  ) {}

  mostrarToastYNavegar(mensaje: string, ruta: string[]) {
    this.toastMensaje = mensaje;
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
      this.router.navigate(ruta);
    }, 2000); 
  }

  guardarReserva() {
    if (!this.form.nombre || !this.form.fecha || !this.form.zona) {
      this.toastMensaje = 'Completa todos los campos, por favor.';
      this.toastVisible = true;
      setTimeout(() => this.toastVisible = false, 3000);
      return;
    }

    if (this.form.zona === 'VIP') {
      localStorage.setItem('reservaVIP', JSON.stringify(this.form));
      this.notificationService.enviarNotificacionAdmin('Nueva Solicitud VIP', `El cliente ${this.form.nombre} quiere la zona VIP para ${this.form.personas} personas.`, 'reserva');
      this.mostrarToastYNavegar('[Operación de "Crear reservación VIP" realizada con éxito.]', ['client', 'payments']);
      return;
    }

    this.reservationService.addReservation({ ...this.form, estado: 'pendiente' });
    this.notificationService.enviarNotificacionAdmin('Nueva Reservación', `El cliente ${this.form.nombre} apartó en zona ${this.form.zona}.`, 'reserva');

    this.mostrarToastYNavegar('[Operación de "Crear reservación" realizada con éxito.]', ['client', 'dashboard']);
  }

  cancelar() { this.router.navigate(['client', 'dashboard']); }
}