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
      position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #6c757d; z-index: 10;
      pointer-events: none; 
    }
    
    .input-dark {
      background-color: #111; border: 1px solid #333; color: white;
      border-radius: 10px; padding: 0.8rem 1rem 0.8rem 45px; transition: all 0.3s;
      appearance: none; 
      cursor: pointer;
    }
    .input-dark:focus {
      border-color: #0dcaf0; box-shadow: 0 0 12px rgba(13, 202, 240, 0.2);
      outline: none; background-color: #111; color: white;
    }
    .input-dark option {
      background-color: #111;
      color: white;
      padding: 10px;
    }

    .btn-cyan {
      background-color: #0dcaf0; color: #000; font-weight: 700; border: none;
      border-radius: 10px; padding: 0.8rem; transition: all 0.3s;
    }
    .btn-cyan:hover {
      box-shadow: 0 0 20px rgba(13, 202, 240, 0.5); transform: translateY(-1px);
    }
    .btn-cancel {
      background-color: transparent; color: #6c757d; border: 1px solid #333;
      border-radius: 10px; padding: 0.8rem; transition: all 0.3s;
    }
    .btn-cancel:hover { border-color: #6c757d; color: white; }
  `]
})
export class NuevaReservacion {

  fechasDisponibles: string[] = [
    'viernes, 23 de octubre de 2026, 9:00 PM',
    'sábado, 24 de octubre de 2026, 10:00 PM',
    'viernes, 30 de octubre de 2026, 8:00 PM',
    'viernes, 6 de noviembre de 2026, 11:00 PM'
  ];

  reserva = {
    nombre: 'Cliente VIP', 
    date: '', 
    people: null as number | null,
    status: 'Pendiente',
    comprobante: null 
  };

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  guardarReserva() {
    if (!this.reserva.date || !this.reserva.people) {
      // Aquí podrías mostrar un modal de error
      return;
    }
    this.reservationService.addReservation(this.reserva).subscribe(() => {
      this.router.navigate(['/client/dashboard']);
    });
  }

  cancelar() {
    this.router.navigate(['/client/dashboard']); 
  }
}