import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  apiUrl = 'http://127.0.0.1:5000/mensajes';

  constructor(private http: HttpClient) {}

  getMensajes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createMensaje(mensaje: any): Observable<any> {
    return this.http.post(this.apiUrl, mensaje);
  }

  getMensaje(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateMensaje(id: string, mensaje: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, mensaje);
  }

  deleteMensaje(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getMensajesByUsuario(usuarioId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?usuario_id=${usuarioId}`);
  }
}
