import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-nueva-reservacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-reservacion.html',
  styles: [`
    .fondo-modal {
      background: rgba(0,0,0,0.85);
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      z-index: 1050;
      backdrop-filter: blur(5px);
    }
    .card-neon-cyan {
      background-color: #0d0d0d;
      border: 1px solid #222;
      border-radius: 16px;
      width: 100%; max-width: 420px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.9);
    }

    .input-with-icon { position: relative; }
    .input-with-icon svg {
      position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
      color: #6c757d; z-index: 10;
      pointer-events: none;
    }

    .input-dark {
      background-color: #111;
      border: 1px solid #333;
      color: white;
      border-radius: 10px;
      padding: 0.8rem 1rem 0.8rem 45px;
      transition: all 0.3s;
      appearance: none;
      cursor: pointer;
    }

    .input-dark:focus {
      border-color: #0dcaf0;
      box-shadow: 0 0 12px rgba(13, 202, 240, 0.2);
      outline: none;
    }

    .input-dark option {
      background-color: #111;
      color: white;
    }

    .btn-cyan {
      background-color: #0dcaf0;
      color: #000;
      font-weight: 700;
      border: none;
      border-radius: 10px;
      padding: 0.8rem;
      transition: all 0.3s;
    }

    .btn-cyan:hover {
      box-shadow: 0 0 20px rgba(13, 202, 240, 0.5);
    }

    .btn-cancel {
      background-color: transparent;
      color: #6c757d;
      border: 1px solid #333;
      border-radius: 10px;
      padding: 0.8rem;
    }
  `]
})
export class NuevaReservacion {

  // 🔥 FECHAS
  fechasDisponibles: string[] = [
    'viernes, 23 de octubre de 2026, 9:00 PM',
    'sábado, 24 de octubre de 2026, 10:00 PM',
    'viernes, 30 de octubre de 2026, 8:00 PM',
    'viernes, 6 de noviembre de 2026, 11:00 PM'
  ];

  // 🔥 FORMULARIO
  form = {
    nombre: '',
    fecha: '',
    personas: 1,
    comprobante: '',
    zona: ''
  };

  // 🔥 VARIABLES DEL TOAST (Por si las ocupas en tu HTML)
  toastVisible = false;
  toastMensaje = '';

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  // 🔥 GUARDAR RESERVA
  guardarReserva() {

    // 1. VALIDACIONES
    if (!this.form.nombre || !this.form.fecha) {
      alert('Completa todos los campos obligatorios');
      return;
    }

    if (!this.form.zona) {
      alert('Selecciona una zona');
      return;
    }

    // 2. 🔥 LÓGICA VIP CORREGIDA (Solo si es VIP)
    if (this.form.zona === 'VIP' || this.form.zona === 'Booth VIP 1' || this.form.zona === 'Booth VIP 2') {
      localStorage.setItem('reservaVIP', JSON.stringify({
        nombre: this.form.nombre,
        fecha: this.form.fecha,
        personas: this.form.personas,
        zona: this.form.zona,
        estado: 'Pendiente'
      }));
    }

    // 3. 🔥 GUARDAR NORMAL CORREGIDO (Todo en español para que el Admin lo lea)
    this.reservationService.addReservation({
      nombre: this.form.nombre,
      fecha: this.form.fecha,       // Estaba como date
      personas: this.form.personas, // Estaba como people
      zona: this.form.zona,
      estado: 'Pendiente'           // Estaba como status
    });

    // 4. LIMPIAR FORM
    this.form = {
      nombre: '',
      fecha: '',
      personas: 1,
      comprobante: '',
      zona: ''
    };

    // 5. REDIRECCIÓN
    // Lo mando a 'reservations' para que el cliente vea que sí se guardó, pero si prefieres 'dashboard', cámbialo.
    this.router.navigate(['client', 'reservations']);
  }

  // 🔥 CANCELAR
  cancelar() {
    this.router.navigate(['client', 'reservations']);
  }
}