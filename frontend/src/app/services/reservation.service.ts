import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private key = 'reservations';

  getReservations() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  addReservation(res: any) {
    const reservations = this.getReservations();
    reservations.push(res);
    localStorage.setItem(this.key, JSON.stringify(reservations));
  }

  updateReservations(reservations: any[]) {
    localStorage.setItem(this.key, JSON.stringify(reservations));
  }
  updateReservationStatus(id: number, nuevoEstado: string) {
  const reservations = this.getReservations();

  reservations[id].status = nuevoEstado;

  localStorage.setItem('reservations', JSON.stringify(reservations));
}

}