import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  apiUrl = 'http://127.0.0.1:5000/reservaciones';

  constructor(private http: HttpClient) {}

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addReservation(reserva: any): Observable<any> {
    return this.http.post(this.apiUrl, reserva);
  }

  getReservation(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateReservation(id: string, reserva: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, reserva);
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}