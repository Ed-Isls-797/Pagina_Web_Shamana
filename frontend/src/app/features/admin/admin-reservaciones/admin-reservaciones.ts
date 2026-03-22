import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'admin-reservaciones',
  standalone: true,
  imports: [CommonModule],
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
export class AdminReservaciones implements OnInit {

  reservaciones: any[] = [];
  reservaSeleccionada: any = null;
  showModal = false;

  toastVisible = false;
  toastMensaje = '';
  toastTipo = 'success'; 
  toastTimeout: any;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservationService.getReservations().subscribe((data: any[]) => {
      this.reservaciones = Array.isArray(data) ? data : [];
    });
  }

  aceptarReserva(reserva: any) {
    reserva.status = 'Aceptado'; 
    this.guardarCambios();
    this.mostrarToast('Lugar aprobado. Ya puedes solicitar el comprobante de pago.', 'success');
  }

  rechazarReserva(reserva: any) {
    reserva.status = 'Rechazado'; 
    this.guardarCambios();
    this.mostrarToast('Reservación rechazada por falta de espacio.', 'danger');
  }

  solicitarPago(reserva: any) {
    this.mostrarToast('Se ha enviado la solicitud de pago al cliente.', 'success');
  }

  abrirModal(reserva: any) {
    this.reservaSeleccionada = reserva;
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    setTimeout(() => this.reservaSeleccionada = null, 300);
  }

  aprobarPago() {
    if (this.reservaSeleccionada) {
      this.reservaSeleccionada.status = 'Confirmado'; 
      this.guardarCambios();
      this.mostrarToast('Pago aprobado. Reservación 100% confirmada.', 'success');
      this.cerrarModal();
    }
  }

  rechazarPago() {
    if (this.reservaSeleccionada) {
      this.reservaSeleccionada.status = 'Rechazado'; 
      this.guardarCambios();
      this.mostrarToast('Comprobante rechazado. Se canceló la reserva.', 'danger');
      this.cerrarModal();
    }
  }

  guardarCambios() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('reservations', JSON.stringify(this.reservaciones));
    }
  }

  mostrarToast(mensaje: string, tipo: 'success' | 'danger') {
    this.toastMensaje = mensaje;
    this.toastTipo = tipo;
    this.toastVisible = true;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => { this.toastVisible = false; }, 3000);
  }
}