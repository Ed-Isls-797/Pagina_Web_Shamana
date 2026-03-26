import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common'; // <-- IMPORTANTE para los colores dinámicos

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './reservations.html'
})
export class Reservations implements OnInit {
  reservations: any[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    // Le agregamos .reverse() para que el ticket más nuevo salga primero
    this.reservations = this.reservationService.getReservations().reverse();
  }

  irNuevaReserva() { 
    this.router.navigate(['/client/nueva-reservacion']); 
  }

  // --- FUNCIONES QUE GIT TE BORRÓ ---
  isFechaValida(fecha: any): boolean {
    return fecha !== null && fecha !== undefined && fecha !== '';
  }

  getFechaParte(fecha: any): string {
    return fecha ? fecha.toString().split(' ')[0] : 'Pendiente';
  }

  getHoraParte(fecha: any): string {
    return '22:00 PM'; // Hora por defecto
  }

  // --- LÓGICA DEL MODAL DE CANCELACIÓN ---
  abrirModalCancelar(index: number) {
    this.modalCancelarIndex = index;
  }

  cerrarModal() {
    this.modalCancelarIndex = null;
  }

  confirmarCancelar() {
    if (this.modalCancelarIndex !== null) {
      const reserva = this.reservations[this.modalCancelarIndex];
      this.resService.updateStatus(reserva.id, 'Rechazado');
      this.cargar();
    }
    this.cerrarModal();
  }
}