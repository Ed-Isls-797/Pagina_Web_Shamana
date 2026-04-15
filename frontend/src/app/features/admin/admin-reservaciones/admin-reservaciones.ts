import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../../services/reservation.service';
import { ComprobantesService } from '../../../services/comprobantes.service';
import { NotificacionesService } from '../../../services/notificaciones.service';

@Component({
  selector: 'admin-reservaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-reservaciones.html',
  styles: [`
    .toast-neutron { position: fixed; top: 30px; right: 30px; z-index: 9999999; opacity: 0; visibility: hidden; transform: translateY(-20px); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .toast-neutron.show-toast { opacity: 1; visibility: visible; transform: translateY(0); }
    .comprobante-img { transition: transform 0.3s ease; cursor: zoom-in; }
    .comprobante-img:hover { transform: scale(1.02); }
    .btn-accion { border-radius: 50%; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; transition: transform 0.2s ease; }
    .btn-accion:hover { transform: scale(1.1); }
  `]
})
export class AdminReservaciones implements OnInit, OnDestroy {

  // --- Reservaciones de clientes ---
  reservaciones: any[] = [];
  reservaSeleccionada: any = null;
  showModalPago = false;
  comprobantesMap: { [reservacionId: string]: any } = {};

  // --- Slots (Nueva Reservación) ---
  showModalSlot = false;
  modoEdicionSlot = false;
  slotEnEdicion: any = null;
  slotForm = { fecha: '', hora: '', zona: '' };

  // --- Historial de slots ---
  showHistorial = false;
  slots: any[] = [];

  // --- Toast ---
  toastVisible = false;
  toastMensaje = '';
  toastTipo = 'success';
  toastTimeout: any;

  // --- Loading State ---
  isSubmitting = false;
  procesando = false;

  // --- Polling ---
  private intervalId: any;

  constructor(
    private reservationService: ReservationService,
    private comprobantesService: ComprobantesService,
    private notificacionesService: NotificacionesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarDatos();
    this.intervalId = setInterval(() => this.cargarDatos(), 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  cargarDatos() {
    this.reservationService.getReservaciones().subscribe(data => {
      this.reservaciones = data;
      this.cdr.detectChanges();
    });
    this.reservationService.getSlots().subscribe(data => {
      this.slots = data;
      this.cdr.detectChanges();
    });
    this.comprobantesService.getComprobantes().subscribe(data => {
      this.comprobantesMap = {};
      data.forEach(c => {
        this.comprobantesMap[c.reservacion_id] = c;
      });
      this.cdr.detectChanges();
    });
  }

  tieneComprobante(reservacionId: string): boolean {
    return !!this.comprobantesMap[reservacionId];
  }

  getComprobante(reservacionId: string): any {
    return this.comprobantesMap[reservacionId] || null;
  }

  // ===== SLOTS (Admin crea fechas disponibles) =====

  abrirModalSlot() {
    this.modoEdicionSlot = false;
    this.slotEnEdicion = null;
    this.slotForm = { fecha: '', hora: '', zona: '' };
    this.showModalSlot = true;
  }

  abrirEditarSlot(slot: any) {
    this.modoEdicionSlot = true;
    this.slotEnEdicion = slot;
    this.slotForm = { fecha: slot.fecha, hora: slot.hora, zona: slot.zona };
    this.showModalSlot = true;
  }

  cerrarModalSlot() {
    this.showModalSlot = false;
    this.slotEnEdicion = null;
  }

  guardarSlot() {
    if (!this.slotForm.fecha || !this.slotForm.hora || !this.slotForm.zona) {
      this.mostrarToast('Completa todos los campos', 'danger');
      return;
    }
    
    if (this.isSubmitting) return; 
    this.isSubmitting = true;

    if (this.modoEdicionSlot && this.slotEnEdicion) {
      this.reservationService.updateSlot(this.slotEnEdicion._id, this.slotForm).subscribe(() => {
        this.mostrarToast('Slot actualizado correctamente', 'success');
        this.cargarDatos();
        this.cerrarModalSlot();
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }, () => {
         this.isSubmitting = false;
         this.cdr.detectChanges();
      });
    } else {
      this.reservationService.createSlot(this.slotForm).subscribe(() => {
        this.mostrarToast('Nueva fecha disponible creada', 'success');
        this.cargarDatos();
        this.cerrarModalSlot();
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }, () => {
        this.isSubmitting = false;
        this.cdr.detectChanges();
      });
    }
  }

  eliminarSlot(slot: any) {
    if (confirm('¿Eliminar esta fecha disponible?')) {
      this.reservationService.deleteSlot(slot._id).subscribe(() => {
        this.mostrarToast('Fecha eliminada', 'danger');
        this.cargarDatos();
      });
    }
  }

  // ===== HISTORIAL =====

  abrirHistorial() {
    this.showHistorial = true;
  }

  cerrarHistorial() {
    this.showHistorial = false;
  }

  // ===== RESERVACIONES DE CLIENTES =====

  aceptarReserva(reserva: any) {
    if (this.procesando) return;
    this.procesando = true;
    this.reservationService.updateReservacion(reserva._id, { status: 'Aceptado' }).subscribe(() => {
      reserva.status = 'Aceptado';
      this.mostrarToast('Lugar aprobado. Ya puedes solicitar el comprobante de pago.', 'success');
      this.notificacionesService.createNotificacion({
        destinatario: reserva.usuario_id,
        tipo: 'reserva',
        titulo: 'Reservación aceptada',
        mensaje: `Tu reservación del ${reserva.fecha} a las ${reserva.hora} ha sido aceptada. Realiza tu pago.`,
        leida: false
      }).subscribe();
      this.procesando = false;
    }, () => { this.procesando = false; });
  }

  rechazarReserva(reserva: any) {
    if (this.procesando) return;
    this.procesando = true;
    this.reservationService.rechazarReservacion(reserva._id).subscribe(() => {
      reserva.status = 'Rechazado';
      this.cargarDatos();
      this.mostrarToast('Reservación rechazada. El slot ha sido liberado.', 'danger');
      this.notificacionesService.createNotificacion({
        destinatario: reserva.usuario_id,
        tipo: 'reserva',
        titulo: 'Reservación rechazada',
        mensaje: `Tu reservación del ${reserva.fecha} a las ${reserva.hora} ha sido rechazada.`,
        leida: false
      }).subscribe();
      this.procesando = false;
    }, () => { this.procesando = false; });
  }

  solicitarPago(reserva: any) {
    if (this.procesando) return;
    this.procesando = true;
    this.notificacionesService.createNotificacion({
      destinatario: reserva.usuario_id,
      tipo: 'pago',
      titulo: 'Pago solicitado',
      mensaje: `Se solicita tu comprobante de pago para la reservación del ${reserva.fecha} a las ${reserva.hora}.`,
      leida: false
    }).subscribe(() => {
      this.mostrarToast('Se ha enviado la solicitud de pago al cliente.', 'success');
      this.procesando = false;
    }, () => { this.procesando = false; });
  }

  abrirModalPago(reserva: any) {
    // Attach the comprobante data to the reserva for the modal
    const comprobante = this.getComprobante(reserva._id);
    if (comprobante) {
      reserva.comprobante = comprobante.archivo_url;
    }
    this.reservaSeleccionada = reserva;
    this.showModalPago = true;
  }

  cerrarModalPago() {
    this.showModalPago = false;
    setTimeout(() => this.reservaSeleccionada = null, 300);
  }

  aprobarPago() {
    if (this.procesando || !this.reservaSeleccionada) return;
    this.procesando = true;
    this.reservationService.updateReservacion(this.reservaSeleccionada._id, { status: 'Confirmado' }).subscribe(() => {
      this.reservaSeleccionada.status = 'Confirmado';
      this.mostrarToast('Pago aprobado. Reservación 100% confirmada.', 'success');
      this.notificacionesService.createNotificacion({
        destinatario: this.reservaSeleccionada.usuario_id,
        tipo: 'pago',
        titulo: 'Pago aprobado',
        mensaje: `Tu pago para la reservación del ${this.reservaSeleccionada.fecha} a las ${this.reservaSeleccionada.hora} ha sido aprobado. ¡Reservación confirmada!`,
        leida: false
      }).subscribe();
      this.procesando = false;
      this.cerrarModalPago();
    }, () => { this.procesando = false; });
  }

  rechazarPago() {
    if (this.procesando || !this.reservaSeleccionada) return;
    this.procesando = true;
    this.reservationService.rechazarReservacion(this.reservaSeleccionada._id).subscribe(() => {
      this.reservaSeleccionada.status = 'Rechazado';
      this.cargarDatos();
      this.mostrarToast('Comprobante rechazado. Slot liberado.', 'danger');
      this.notificacionesService.createNotificacion({
        destinatario: this.reservaSeleccionada.usuario_id,
        tipo: 'pago',
        titulo: 'Pago rechazado',
        mensaje: `Tu comprobante de pago para la reservación del ${this.reservaSeleccionada.fecha} a las ${this.reservaSeleccionada.hora} fue rechazado.`,
        leida: false
      }).subscribe();
      this.procesando = false;
      this.cerrarModalPago();
    }, () => { this.procesando = false; });
  }

  // ===== TOAST =====

  mostrarToast(mensaje: string, tipo: 'success' | 'danger') {
    this.toastMensaje = mensaje;
    this.toastTipo = tipo;
    this.toastVisible = true;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => { this.toastVisible = false; }, 3000);
  }

  getSlotEstadoLabel(estado: string): string {
    return estado === 'disponible' ? 'Disponible' : 'Ocupado';
  }
}