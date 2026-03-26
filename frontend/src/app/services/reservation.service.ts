import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservationService {

  constructor() { }

  getReservations() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('reservations');
      return data ? JSON.parse(data) : [];
    }
    return []; 
  }

  addReservation(reserva: any) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const reservaciones = this.getReservations();
      reservaciones.push(reserva);
      localStorage.setItem('reservations', JSON.stringify(reservaciones));
    }
  }

  saveReservations(reservations: any[]) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('reservations', JSON.stringify(reservations));
    }
  }
  
}