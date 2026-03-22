import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  apiUrl = 'http://127.0.0.1:5000/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post('http://127.0.0.1:5000/register', usuario);
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
