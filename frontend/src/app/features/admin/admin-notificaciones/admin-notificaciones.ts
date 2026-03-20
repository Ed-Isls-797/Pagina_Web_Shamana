import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/notification'; 

@Component({
  selector: 'admin-notificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-notificaciones.html'
})
export class AdminNotificaciones {

  notificaciones = [
    { id: 1, tipo: 'Pago', titulo: 'Nuevo pago recibido', mensaje: 'Sara L. realizó un pago de $1,200', tiempo: 'hace 5 minutos', leida: false },
    { id: 2, tipo: 'Cliente', titulo: 'Nuevo cliente', mensaje: 'Pedro Martínez se registró.', tiempo: 'hace 12 minutos', leida: false }
  ];

  showModal = false;
  nuevoTitulo = '';
  nuevoMensaje = '';
  
  nuevoTipo: 'Cliente' | 'General' = 'General'; 

  constructor(private notificationService: NotificationService) {}

  get noLeidas() { return this.notificaciones.filter(n => !n.leida).length; }

  marcarTodasComoLeidas() { this.notificaciones.forEach(n => n.leida = true); }

  abrirModal() { this.showModal = true; }

  cerrarModal() {
    this.showModal = false;
    this.nuevoTitulo = '';
    this.nuevoMensaje = '';
    this.nuevoTipo = 'General'; 
  }

  get formularioCompleto(): boolean {
    return this.nuevoTitulo.trim() !== '' && this.nuevoMensaje.trim() !== '';
  }

  crearNotificacion() {
    if(!this.formularioCompleto) {
      alert("Llena el título y el mensaje, jefe.");
      return;
    }

    this.notificaciones.unshift({
      id: Date.now(),
      tipo: this.nuevoTipo,
      titulo: this.nuevoTitulo,
      mensaje: this.nuevoMensaje,
      tiempo: 'hace un momento',
      leida: false
    });

    console.log("Disparando banner:", this.nuevoTitulo, "Mensaje:", this.nuevoMensaje, "Para:", this.nuevoTipo);
    
    this.notificationService.publicarNotificacion(this.nuevoTitulo, this.nuevoMensaje, this.nuevoTipo);

    this.cerrarModal();
  }
}