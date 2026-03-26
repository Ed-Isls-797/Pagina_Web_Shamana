import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComprobantesService {
  apiUrl = 'http://127.0.0.1:5000/comprobantes';

  constructor(private http: HttpClient) {}

  getComprobantes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createComprobante(comprobante: any): Observable<any> {
    return this.http.post(this.apiUrl, comprobante);
  }

  getComprobante(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateComprobante(id: string, comprobante: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, comprobante);
  }

  deleteComprobante(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
