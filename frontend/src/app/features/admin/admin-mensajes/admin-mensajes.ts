import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'admin-mensajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-mensajes.html'
})
export class AdminMensajes {

  solicitudes = [
    {
      id: 1, cliente: 'Juan Pérez', email: 'juan@email.com', estado: 'Pendiente', asunto: 'Consulta sobre botella VIP',
      conversacion: [
        { emisor: 'cliente', texto: 'Hola, me gustaría saber el precio de una botella de Hennessy para mi reservación del viernes...', tiempo: 'hace 5 min' }
      ]
    },
    {
      id: 2, cliente: 'María García', email: 'maria@email.com', estado: 'Aceptado', asunto: 'Cambio de mesa',
      conversacion: [
        { emisor: 'cliente', texto: 'Quisiera cambiar mi reservación a una mesa más cercana al escenario si es posible...', tiempo: 'hace 30 min' },
        { emisor: 'admin', texto: '¡Hola María! Claro que sí, déjame revisar el mapa de mesas y te confirmo en un momento.', tiempo: 'hace 10 min' }
      ]
    },
    {
      id: 3, cliente: 'Carlos López', email: 'carlos@email.com', estado: 'Aceptado', asunto: 'Confirmación de pago',
      conversacion: [
        { emisor: 'cliente', texto: 'Ya realicé el pago de la reservación, adjunto el comprobante por correo.', tiempo: 'hace 1 hora' }
      ]
    },
    {
      id: 4, cliente: 'Ana Martínez', email: 'ana@email.com', estado: 'Pendiente', asunto: 'Pregunta sobre dress code',
      conversacion: [
        { emisor: 'cliente', texto: '¿Cuál es el dress code para el evento de este sábado?', tiempo: 'hace 2 horas' }
      ]
    }
  ];


  mensajeSeleccionado: any = this.solicitudes[1];
  respuestaAdmin: string = '';

  seleccionarMensaje(solicitud: any) {
    this.mensajeSeleccionado = solicitud;
    this.respuestaAdmin = '';
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

  enviarRespuesta() {
    if (this.respuestaAdmin.trim() === '') return;

    this.mensajeSeleccionado.conversacion.push({
      emisor: 'admin',
      texto: this.respuestaAdmin,
      tiempo: 'Ahora'
    });

    this.respuestaAdmin = '';
  }
}