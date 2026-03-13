import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'admin-notificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-notificaciones.html'
})
export class AdminNotificaciones {

  // Las notificaciones calcadas de tu imagen de referencia
  notificaciones = [
    { id: 1, tipo: 'pago', titulo: 'Nuevo pago recibido', mensaje: 'Sara L. realizó un pago de $1,200 por reservación Booth VIP 2.', tiempo: 'hace 5 minutos', leida: false },
    { id: 2, tipo: 'cliente', titulo: 'Nuevo cliente registrado', mensaje: 'Pedro Martínez se registró en la plataforma.', tiempo: 'hace 12 minutos', leida: false },
    { id: 3, tipo: 'mensaje', titulo: 'Solicitud de mensaje', mensaje: 'Juan Pérez solicita comunicación directa sobre botella VIP.', tiempo: 'hace 1 hora', leida: false },
    { id: 4, tipo: 'reserva', titulo: 'Nueva reservación', mensaje: 'Ana Martínez reservó Mesa VIP para el 24 de octubre.', tiempo: 'hace 2 horas', leida: true },
    { id: 5, tipo: 'pago', titulo: 'Pago aprobado', mensaje: 'El comprobante de Carlos López fue verificado y aprobado.', tiempo: 'hace 3 horas', leida: true },
    { id: 6, tipo: 'cliente', titulo: 'Nuevo cliente registrado', mensaje: 'Sofía Ruiz se registró en la plataforma.', tiempo: 'hace 5 horas', leida: true }
  ];

  // Variables del Modal
  showModal = false;
  nuevoTitulo = '';
  nuevoMensaje = '';
  nuevoTipo = 'mensaje'; // Tipo por defecto

  // Calcula cuántas faltan por leer para el subtítulo
  get noLeidas() {
    return this.notificaciones.filter(n => !n.leida).length;
  }

  marcarTodasComoLeidas() {
    this.notificaciones.forEach(n => n.leida = true);
  }

  // --- LÓGICA DEL MODAL ---
  abrirModal() {
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    this.nuevoTitulo = '';
    this.nuevoMensaje = '';
    this.nuevoTipo = 'mensaje';
  }

  get formularioCompleto(): boolean {
    return this.nuevoTitulo.trim() !== '' && this.nuevoMensaje.trim() !== '';
  }

  crearNotificacion() {
    if(!this.formularioCompleto) return;

    const nuevaNoti = {
      id: Date.now(),
      tipo: this.nuevoTipo,
      titulo: this.nuevoTitulo,
      mensaje: this.nuevoMensaje,
      tiempo: 'hace un momento',
      leida: false
    };

    // La agregamos hasta arriba de la lista
    this.notificaciones.unshift(nuevaNoti);
    this.cerrarModal();
  }

}