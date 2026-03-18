import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-nueva-reservacion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nueva-reservacion.html'
})
export class NuevaReservacion {

  reserva = {
    date: '',
    people: 1,
    status: 'Pendiente'
  };

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  guardarReserva() {
    this.reservationService.addReservation(this.reserva);

    alert('Reservación creada correctamente');

    this.router.navigate(['/client/reservations']); // ✅ CORRECTO
  }

}