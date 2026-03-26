import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://127.0.0.1:5000/eventos'; // Adjust if backend URL is different

  constructor(private http: HttpClient) {}

  obtenerEventos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarEvento(evento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, evento);
  }

  actualizarEvento(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  eliminarEvento(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}