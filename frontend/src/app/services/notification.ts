import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  publicarNotificacion(titulo: string, mensaje: string, tipo: 'Cliente' | 'General') {
    if (typeof window !== 'undefined' && window.localStorage) {
      const notificacion = { titulo, mensaje, tipo, activa: true, id: new Date().getTime() };
      localStorage.setItem('shamana_notificacion', JSON.stringify(notificacion));
      
      window.dispatchEvent(new Event('notificacion_actualizada'));
    }
  }

  obtenerNotificacion(tipoDestino: 'Cliente' | 'General') {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('shamana_notificacion');
      if (data) {
        const notificacion = JSON.parse(data);
        if (notificacion.activa && notificacion.tipo === tipoDestino) {
          return notificacion;
        }
      }
    }
    return null;
  }

  cerrarNotificacion() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('shamana_notificacion');
      if (data) {
        const notificacion = JSON.parse(data);
        notificacion.activa = false; 
        localStorage.setItem('shamana_notificacion', JSON.stringify(notificacion));
        window.dispatchEvent(new Event('notificacion_actualizada'));
      }
    }
  }
}