import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private storageKey = 'shamana_reservations_database';
  private reservations: any[] = [];

  constructor() { this.load(); }

  private load() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(this.storageKey);
      this.reservations = saved ? JSON.parse(saved) : [];
    }
  }

  getReservations() { this.load(); return this.reservations; }

  addReservation(reserva: any) {
    const nueva = { ...reserva, id: Date.now(), estado: 'Pendiente' };
    this.reservations.push(nueva);
    this.save();
  }

  updateStatus(id: number, nuevoEstado: string) {
    const index = this.reservations.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservations[index].estado = nuevoEstado;
      this.save();
    }
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.reservations));
    window.dispatchEvent(new Event('storage'));
  }
  
}