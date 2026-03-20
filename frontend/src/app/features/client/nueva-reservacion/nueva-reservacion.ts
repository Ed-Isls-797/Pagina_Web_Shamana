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
    .fondo-modal { background: rgba(0,0,0,0.8); position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; z-index: 1050; backdrop-filter: blur(8px); }
    .card-neon-cyan { background-color: #09090b; border: 1px solid #1f1f23; border-radius: 16px; width: 100%; max-width: 440px; padding: 2rem; }
    .btn-cyan { background-color: #0dcaf0; color: #000; font-weight: 700; border: none; border-radius: 8px; padding: 0.9rem; width: 100%; box-shadow: 0 0 15px rgba(13, 202, 240, 0.3); }
  `]
})
export class NuevaReservacion {
  // 🔥 ESTA ES LA VARIABLE QUE TE FALTABA 🔥
  fechasDisponibles: string[] = ['Viernes 23 de Octubre', 'Sábado 24 de Octubre'];
  form = { nombre: '', fecha: '', personas: 1, zona: '' };
  toastVisible = false; toastMensaje = '';

  constructor(private resService: ReservationService, private router: Router) {}

  guardarReserva() {
    this.resService.addReservation({ ...this.form });
    this.toastVisible = true;
    this.toastMensaje = 'Reservación creada';
    setTimeout(() => { this.toastVisible = false; this.router.navigate(['client/reservations']); }, 2000);
  }

  cancelar() { this.router.navigate(['client/reservations']); }
}