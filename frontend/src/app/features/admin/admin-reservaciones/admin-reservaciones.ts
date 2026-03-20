import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../../services/reservation.service';
import { NotificationService } from '../../../services/notification';

@Component({
  selector: 'admin-reservaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reservaciones.html'
})
export class AdminReservaciones implements OnInit {
  reservaciones: any[] = [];
  toastVisible = false; toastMensaje = '';

  constructor(private resService: ReservationService, private notiService: NotificationService) {}

  ngOnInit() { this.cargar(); }

  @HostListener('window:storage')
  cargar() { this.reservaciones = this.resService.getReservations().slice().reverse(); }

  aceptarReserva(r: any) {
    this.resService.updateStatus(r.id, 'Aceptado');
    this.cargar();
    this.mostrarToast('Aceptada');
  }

  rechazarReserva(r: any) {
    this.resService.updateStatus(r.id, 'Rechazado');
    this.cargar();
    this.mostrarToast('Rechazada');
  }

  solicitarPago(r: any) {
    this.resService.updateStatus(r.id, 'Esperando Pago');
    this.cargar();
    this.notiService.publicarNotificacion('Pago', 'Sube tu ticket', 'Cliente');
    this.mostrarToast('Pago Solicitado');
  }

  verPago(r: any, accion: string) {
    const estado = accion === 'Aprobar' ? 'Confirmado' : 'Rechazado';
    this.resService.updateStatus(r.id, estado);
    this.cargar();
    this.mostrarToast(`Pago ${accion}ado`);
  }

  mostrarToast(m: string) {
    this.toastMensaje = m; this.toastVisible = true;
    setTimeout(() => { this.toastVisible = false; }, 3000);
  }
}