import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-mensajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-mensajes.html'
})
export class AdminMensajes {

  solicitudes = [
    { id: 1, cliente: 'Juan Pérez', email: 'juan@email.com', tiempo: 'hace 5 min', estado: 'Pendiente', asunto: 'Consulta sobre botella VIP', mensaje: 'Hola, me gustaría saber el precio de una botella de Hennessy para mi reservación del viernes...' },
    { id: 2, cliente: 'María García', email: 'maria@email.com', tiempo: 'hace 30 min', estado: 'Aceptado', asunto: 'Cambio de mesa', mensaje: 'Quisiera cambiar mi reservación a una mesa más cercana al escenario si es posible...' },
    { id: 3, cliente: 'Carlos López', email: 'carlos@email.com', tiempo: 'hace 1 hora', estado: 'Aceptado', asunto: 'Confirmación de pago', mensaje: 'Ya realicé el pago de la reservación, adjunto el comprobante...' },
    { id: 4, cliente: 'Ana Martínez', email: 'ana@email.com', tiempo: 'hace 2 horas', estado: 'Pendiente', asunto: 'Pregunta sobre dress code', mensaje: '¿Cuál es el dress code para el evento del sábado?' }
  ];

  mensajeSeleccionado: any = this.solicitudes[3]; 

  seleccionarMensaje(solicitud: any) {
    this.mensajeSeleccionado = solicitud;
  }

  aceptarSolicitud() {
    if (this.mensajeSeleccionado) {
      this.mensajeSeleccionado.estado = 'Aceptado';
    }
  }

  rechazarSolicitud() {
    if (this.mensajeSeleccionado) {
      this.mensajeSeleccionado.estado = 'Rechazado';
    }
  }
}