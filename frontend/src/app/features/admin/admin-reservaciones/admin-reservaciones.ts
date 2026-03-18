import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'admin-reservaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reservaciones.html',
  styles: [`
    .toast-neutron {
      position: fixed;
      top: 30px;
      right: 30px;
      z-index: 9999999;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-20px);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .toast-neutron.show-toast {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .comprobante-img {
      transition: transform 0.3s ease;
      cursor: zoom-in;
    }
    .comprobante-img:hover {
      transform: scale(1.02);
    }
  `]
})
export class AdminReservaciones {

  reservaciones: any[] = [];

  reservaSeleccionada: any = null;
  showModal = false;

  toastVisible = false;
  toastMensaje = '';
  toastTipo = 'success'; 
  toastTimeout: any;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    const data = this.reservationService.getReservations();

    // 🔥 ADAPTAMOS LOS DATOS AL FORMATO DEL ADMIN
    this.reservaciones = data.map((res: any, index: number) => ({
      id: index + 1,
      cliente: 'Cliente App', // puedes mejorar luego
      fecha: res.date,
      mesa: res.people + ' personas',
      estado: res.status || 'Pendiente',
      monto: 'Sin definir',
      comprobante: 'https://via.placeholder.com/400'
    }));
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

    this.reservationService.updateReservationStatus(
      this.reservaSeleccionada.id - 1,
      'Confirmado'
    );

    this.reservaSeleccionada.estado = 'Confirmado';

    this.mostrarToast('Pago aprobado. Reservación confirmada.', 'success');
    this.cerrarModal();
  }
}

  rechazarPago() {
    if (this.reservaSeleccionada) {
      this.reservaSeleccionada.estado = 'Rechazado';
      this.mostrarToast('Pago rechazado. Se notificará al cliente.', 'danger');
      this.cerrarModal();
    }
  }

  mostrarToast(mensaje: string, tipo: 'success' | 'danger') {
    this.toastMensaje = mensaje;
    this.toastTipo = tipo;
    this.toastVisible = true;
    
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    
    this.toastTimeout = setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }

}