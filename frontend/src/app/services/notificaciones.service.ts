import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificacionesService {
  private apiUrl = 'http://127.0.0.1:5000/notificaciones';

  constructor(private http: HttpClient) {}

  getNotificaciones(destinatario?: string): Observable<any[]> {
    const url = destinatario ? `${this.apiUrl}?destinatario=${destinatario}` : this.apiUrl;
    return this.http.get<any[]>(url);
  }

  createNotificacion(notificacion: any): Observable<any> {
    return this.http.post(this.apiUrl, notificacion);
  }

  updateNotificacion(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteNotificacion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  marcarTodasLeidas(destinatario?: string): Observable<any> {
    const url = destinatario
      ? `${this.apiUrl}/marcar-leidas?destinatario=${destinatario}`
      : `${this.apiUrl}/marcar-leidas`;
    return this.http.put(url, {});
  }
}
