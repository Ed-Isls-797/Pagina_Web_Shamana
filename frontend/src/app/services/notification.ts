import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor() {}

  publicarNotificacion(titulo: string, mensaje: string, destino: string) {
    if (typeof window !== 'undefined') {
      const noti = { titulo, mensaje, destino, fecha: new Date() };
      localStorage.setItem('shamana_last_noti', JSON.stringify(noti));
      window.dispatchEvent(new Event('storage'));
    }
  }

  enviarNotificacionAdmin(titulo: string, mensaje: string, tipo: string, data?: any) {
    if (typeof window !== 'undefined') {
      const info = { titulo, mensaje, tipo, data, fecha: new Date() };
      localStorage.setItem('shamana_admin_noti', JSON.stringify(info));
      window.dispatchEvent(new Event('storage'));
    }
  }

  // 🔥 AQUÍ ESTÁ LA QUE DECÍA QUE NO EXISTÍA 🔥
  obtenerBuzonAdmin() {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('shamana_admin_noti');
      return data ? [JSON.parse(data)] : [];
    }
    return [];
  }

  obtenerNotificacion(destino: string) {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('shamana_last_noti');
      if (!data) return null;
      const noti = JSON.parse(data);
      return noti.destino === destino ? noti : null;
    }
    return null;
  }

  cerrarNotificacion() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('shamana_last_noti');
      window.dispatchEvent(new Event('storage'));
    }
  }
}