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
  this.reservations = (this.reservationService.getReservations() as any[])
    .map((r: any) => ({
      ...r,
      status: r.status === 'Aceptado' ? 'Confirmada' : r.status
    }))
    .reverse();
}

isFechaValida(fecha: string): boolean {
  return !!fecha && fecha.trim().length > 0;
}

getFechaParte(fecha: string): string {
  // Retorna todo antes de la última coma → "viernes, 23 de octubre de 2026"
  const partes = fecha.split(',');
  return partes.slice(0, -1).join(',').trim();
}

getHoraParte(fecha: string): string {
  // Retorna lo último después de la última coma → "9:00 PM"
  const partes = fecha.split(',');
  return partes[partes.length - 1].trim();
}
  irNuevaReserva() {
    this.router.navigate(['/client/nueva-reservacion']);
  }

  abrirModalCancelar(index: number) {
    this.modalCancelarIndex = index;
  }

  cerrarModal() {
    this.modalCancelarIndex = null;
  }

  confirmarCancelar() {
    if (this.modalCancelarIndex === null) return;

    // Elimina del array local
    this.reservations.splice(this.modalCancelarIndex, 1);

    // Persiste en localStorage a través del servicio
    // (el array ya está invertido, así que guardamos la copia original)
    this.reservationService.saveReservations([...this.reservations].reverse());

    this.cerrarModal();
  }
}