import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  // --- SLOTS ---
  getSlots(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/slots`);
  }

  getSlotsDisponibles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/slots?estado=disponible`);
  }

  createSlot(slot: { fecha: string; hora: string; zona: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/slots`, slot);
  }

  updateSlot(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/slots/${id}`, data);
  }

  deleteSlot(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/slots/${id}`);
  }

  // --- RESERVACIONES DE CLIENTES ---
  getReservaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservaciones`);
  }

  createReservacion(reservacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservaciones`, reservacion);
  }

  updateReservacion(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/reservaciones/${id}`, data);
  }

  deleteReservacion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reservaciones/${id}`);
  }

  rechazarReservacion(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/reservaciones/${id}/rechazar`, {});
  }
}