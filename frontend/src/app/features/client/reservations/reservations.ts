import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './reservations.html',
  styles: [`
    /* 🔥 EL DISEÑO CALCADO DE TU FOTO 🔥 */
    .card-reserva {
      background-color: #121214; /* Gris súper oscuro */
      border: 1px solid #1f1f23;
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .card-reserva:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
      border-color: #27272a;
    }

    .text-cyan-neon {
      color: #0dcaf0 !important;
      text-shadow: 0 0 10px rgba(13, 202, 240, 0.2);
    }

    .fecha-label {
      font-size: 0.65rem;
      letter-spacing: 1px;
      color: #71717a;
      text-transform: uppercase;
    }

    .divider-vertical {
      width: 1px;
      background-color: #27272a;
      height: 40px;
      margin: 0 15px;
    }

    .estado-texto {
      font-size: 0.75rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    /* Colores dinámicos para los estados */
    .st-aceptado { color: #f4f4f5; } /* Blanco como en tu foto */
    .st-rechazado { color: #f4f4f5; }
    .st-pendiente { color: #f4f4f5; }
    
    .icon-estado { color: #f4f4f5; } /* El iconito del reloj o palomita */
  `]
})
export class Reservations implements OnInit {

  reservations: any[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.reservations = this.reservationService.getReservations().reverse();
  }

  irNuevaReserva() {
    this.router.navigate(['/client/nueva-reservacion']);
  }  
}