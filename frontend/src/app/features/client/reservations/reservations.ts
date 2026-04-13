import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './reservations.html'
})
export class Reservations implements OnInit {
  reservations: any[] = [];
  modalCancelarIndex: number | null = null;

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() { 
    this.reservations = this.reservationService.getReservations().reverse();
  }

  irNuevaReserva() { 
    this.router.navigate(['/client/nueva-reservacion']); 
  }

  isFechaValida(fecha: any): boolean {
    return fecha !== null && fecha !== undefined && fecha !== '';
  }

  getFechaParte(fecha: any): string {
    return fecha ? fecha.toString().split(' ')[0] : 'Pendiente';
  }

  getHoraParte(fecha: any): string {
    return '22:00 PM'; 
  }

  abrirModalCancelar(index: number) {
    this.modalCancelarIndex = index;
  }

  cerrarModal() {
    this.modalCancelarIndex = null;
  }

  confirmarCancelar() {
    if (this.modalCancelarIndex !== null) {
      // 1. Obtenemos la reserva
      const reserva = this.reservations[this.modalCancelarIndex];
      
      // 2. Le cambiamos el estado a Cancelado (o Rechazado, como prefieras)
      reserva.status = 'Cancelado'; 

      // 3. Guardamos los cambios en el LocalStorage (igual que en el admin)
      if (typeof window !== 'undefined' && window.localStorage) {
          // Nota: Invertimos el reverse() para guardar el orden original
          const ordenOriginal = [...this.reservations].reverse();
          localStorage.setItem('reservations', JSON.stringify(ordenOriginal));
      }

      // 4. Recargamos la lista
      this.cargar();
    }
    this.cerrarModal();
  }
}