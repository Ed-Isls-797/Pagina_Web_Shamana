import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  // 🔥 ESTA ES LA FUNCIÓN QUE ANGULAR DICE QUE NO EXISTE 🔥
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

  // 🔥 ESTA ES LA OTRA FUNCIÓN QUE ANGULAR DICE QUE NO EXISTE 🔥
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

  publicarNotificacion(titulo: string, mensaje: string, tipo: 'Cliente' | 'General') {
    if (typeof window !== 'undefined' && window.localStorage) {
      const notificacion = { titulo, mensaje, tipo, activa: true, id: new Date().getTime() };
      localStorage.setItem('shamana_notificacion', JSON.stringify(notificacion));
      
      localStorage.setItem('shamana_trigger_client', new Date().getTime().toString());
      window.dispatchEvent(new Event('notificacion_actualizada'));
    }
  }

  enviarNotificacionAdmin(titulo: string, mensaje: string, tipo: 'reserva' | 'pago' | 'cliente' | 'mensaje', imagenBase64: string = '') {
    if (typeof window !== 'undefined' && window.localStorage) {
      let inbox = JSON.parse(localStorage.getItem('shamana_admin_inbox') || '[]');
      
      const nuevaNoti = {
        id: Date.now(),
        tipo: tipo,
        titulo: titulo,
        mensaje: mensaje,
        tiempo: 'hace un momento',
        imagen: imagenBase64,
        leida: false
      };
      
      inbox.unshift(nuevaNoti); 
      localStorage.setItem('shamana_admin_inbox', JSON.stringify(inbox));
      
      localStorage.setItem('shamana_trigger_admin', new Date().getTime().toString());
      window.dispatchEvent(new Event('admin_inbox_updated')); 
    }
  }

  obtenerBuzonAdmin() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return JSON.parse(localStorage.getItem('shamana_admin_inbox') || '[]');
    }
    return [];
  }

  marcarBuzonAdminLeido() {
    if (typeof window !== 'undefined' && window.localStorage) {
      let inbox = JSON.parse(localStorage.getItem('shamana_admin_inbox') || '[]');
      inbox.forEach((n: any) => n.leida = true);
      localStorage.setItem('shamana_admin_inbox', JSON.stringify(inbox));
      window.dispatchEvent(new Event('admin_inbox_updated'));
    }
  }
}