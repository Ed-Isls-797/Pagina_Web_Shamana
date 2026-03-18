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
    nombre: '',
    date: '',
    people: 1,
    status: 'Pendiente',
    comprobante: '' as string | null // 👈 MEJOR TIPADO
  };

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  guardarReserva() {

    // 🔥 VALIDACIÓN (IMPORTANTE)
    if (!this.reserva.nombre || !this.reserva.date || !this.reserva.comprobante) {
      alert('Completa todos los campos');
      return;
    }

    this.reservationService.addReservation(this.reserva);

    alert('Reservación creada correctamente');

    this.router.navigate(['/client/reservations']); 
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.reserva.comprobante = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

}