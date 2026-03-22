import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GaleriaService {
  apiUrl = 'http://127.0.0.1:5000/galeria';

  constructor(private http: HttpClient) {}

  getGaleria(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createGaleria(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  getGaleriaItem(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateGaleriaItem(id: string, item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  deleteGaleriaItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
