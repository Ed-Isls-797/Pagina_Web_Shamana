import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  apiUrl = 'http://127.0.0.1:5000/eventos';

  constructor(private http: HttpClient) {}

  obtenerEventos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarEvento(evento: any): Observable<any> {
    return this.http.post(this.apiUrl, evento);
  }

  getEvento(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateEvento(id: string, evento: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, evento);
  }

  deleteEvento(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}