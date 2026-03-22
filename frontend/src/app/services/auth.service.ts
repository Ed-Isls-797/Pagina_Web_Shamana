import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000/login';
  private sessionKey = 'shamana_session';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((res: any) => {
        if (isPlatformBrowser(this.platformId) && res && res.usuario) {
          localStorage.setItem(this.sessionKey, JSON.stringify(res.usuario));
        }
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.sessionKey);
    }
  }

  getSession() {
    if (isPlatformBrowser(this.platformId)) {
      const session = localStorage.getItem(this.sessionKey);
      return session ? JSON.parse(session) : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.getSession();
    }
    return true; // En SSR, permitir acceso para evitar errores
  }

  getUserRole(): string | null {
    const session = this.getSession();
    return session?.rol || null;
  }
}
