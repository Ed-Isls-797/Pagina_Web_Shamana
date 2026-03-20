import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../../services/reservation.service';
import { NotificationService } from '../../../services/notification';

@Component({
  selector: 'admin-reservaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reservaciones.html',
  styles: [`
    .table-dark { background-color: #111 !important; color: white; }
    .table-dark th { color: #888; font-size: 0.75rem; letter-spacing: 1px; border-bottom: 1px solid #333; }
    .table-dark td { border-bottom: 1px solid #222; vertical-align: middle; padding: 1rem 0.5rem; }
    
    .badge-estado { padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; background: transparent; }
    .st-confirmado { color: #20c997; border: 1px solid #20c997; }
    .st-rechazado { color: #dc3545; border: 1px solid #dc3545; }
    .st-aceptado { color: #0dcaf0; border: 1px solid #0dcaf0; }
    .st-pendiente { color: #6c757d; border: 1px solid #6c757d; }

    .btn-accion { background: transparent; font-size: 0.75rem; font-weight: bold; border-radius: 20px; padding: 4px 12px; transition: 0.3s; }
    .btn-ver-pago { color: #ffc107; border: 1px solid #ffc107; }
    .btn-ver-pago:hover { background: rgba(255, 193, 7, 0.1); }
    .btn-solicitar { color: #0dcaf0; border: 1px solid #0dcaf0; }
    .btn-solicitar:hover { background: rgba(13, 202, 240, 0.1); }
    
    .btn-aceptar { color: #198754; border: 1px solid #198754; margin-right: 5px; }
    .btn-aceptar:hover { background: rgba(25, 135, 84, 0.1); }
    .btn-rechazar { color: #dc3545; border: 1px solid #dc3545; }
    .btn-rechazar:hover { background: rgba(220, 53, 69, 0.1); }

    .toast-neutron { position: fixed; top: 30px; right: 30px; z-index: 9999999; opacity: 0; visibility: hidden; transform: translateY(-20px); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .toast-neutron.show-toast { opacity: 1; visibility: visible; transform: translateY(0); }
  `]
})
export class AdminReservaciones implements OnInit {

  // Simulamos los datos de tu foto para que funcione
  reservaciones: any[] = [
    { nombre: 'gorila aplastar ciudad...', fecha: '2026-03-26', personas: 1, monto: 'Sin definir', estado: 'Confirmado' },
    { nombre: 'El borregito cachorrito...', fecha: '2026-03-27', personas: 35, monto: 'Sin definir', estado: 'Rechazado' },
    { nombre: 'Cliente VIP', fecha: 'viernes, 23 de octubre de 2026', personas: 8, monto: 'Sin definir', estado: 'Aceptado' },
    { nombre: 'Torelo', fecha: 'Por definir', personas: 4, monto: 'Sin definir', estado: 'Pendiente' } // La "O" de tu foto
  ];

  toastVisible = false;
  toastMensaje = '';

  constructor(
    private reservationService: ReservationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // Aquí puedes cargar las reales this.reservationService.getReservations();
  }

  // 🔥 1. BOTÓN ACEPTAR RESERVA (Nueva) 🔥
  aceptarReserva(reserva: any) {
    reserva.estado = 'Aceptado';
    this.mostrarToast('[Operación de "Aceptar reservación" realizada con éxito.]');
  }

  // 🔥 2. BOTÓN RECHAZAR RESERVA (Nueva) 🔥
  rechazarReserva(reserva: any) {
    reserva.estado = 'Rechazado';
    this.notificationService.publicarNotificacion('❌ Reserva Rechazada', `Lo sentimos, la reserva de ${reserva.nombre} fue rechazada por falta de espacio.`, 'Cliente');
    this.mostrarToast('[Operación de "Rechazar reservación" realizada con éxito.]');
  }

  // 🔥 3. BOTÓN SOLICITAR PAGO 🔥
  solicitarPago(reserva: any) {
    this.notificationService.publicarNotificacion('💳 Pago Requerido', `Tu reservación fue aceptada. Sube tu comprobante de pago en tu panel.`, 'Cliente');
    this.mostrarToast('[Operación de "Solicitar comprobante de pago" realizada con éxito.]');
  }

  // 🔥 4. BOTÓN VER PAGO (Aprobar o Rechazar el ticket) 🔥
  verPago(reserva: any, accion: 'Aprobar' | 'Rechazar') {
    if (accion === 'Aprobar') {
      reserva.estado = 'Confirmado';
      this.notificationService.publicarNotificacion('🎉 ¡Pago Aprobado!', `Tu pago ha sido validado. Mesa confirmada.`, 'Cliente');
      this.mostrarToast('[Operación de "Aprobar comprobante" realizada con éxito.]');
    } else {
      reserva.estado = 'Rechazado';
      this.notificationService.publicarNotificacion('⚠️ Pago Rechazado', `Hubo un problema con tu comprobante. Revisa la info.`, 'Cliente');
      this.mostrarToast('[Operación de "Rechazar comprobante" realizada con éxito.]');
    }
  }

  mostrarToast(mensaje: string) {
    this.toastMensaje = mensaje;
    this.toastVisible = true;
    setTimeout(() => { this.toastVisible = false; }, 3000);
  }
}